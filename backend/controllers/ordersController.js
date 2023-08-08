// this file contains functions for Order endpoints operations
import OrderItem from '../models/order-item.js';
import Order from '../models/order.js';

class OrdersController {
  static async getAllOrders(request, response) {
    const ordersList = await find().populate('userId', 'name').sort({dateOrdered: -1});
    // populate fills the category field with all information for the category
    // because of the reference created to the User schema.
    // name means only the name of the user should be gotten, more details can be added like name.
    // {dateOrdered: -1} sorts from NEWEST to OLDEST.
    if (!ordersList) {
      return response.status(500).json({ error: `Server error, please try again.\n Details: ${error}` });
    } 
    return response.status(200).send(ordersList);
  }

  static async getOrder(request, response) {
    const {orderId} = request.params;
    const order = await Order.findById(orderId)
    .populate('userId', 'name')
    .populate({
      path: 'orderItemsIds', 
      populate: {
        path: 'productId', populate: 'categoryId'
    }
    }).sort({dateOrdered: -1});
    // populate fills the productId field inside orderItemsId with all information for the product
    // because of the reference created to the User schema. Also fills the categoryId field.
    // name means only the name of the user should be gotten, more details can be added like name.
    // {dateOrdered: -1} sorts from NEWEST to OLDEST.
    if (!order) {
      return response.status(500).json({ error: 'Server error, please try again.', Details: `${error}` });
    }
    return response.status(200).send(order);
  }

  // create new order
  static async createNewOrder(request, response) {
    // use Promise.all() to resolve the fetching of all order items as one promise
    const orderItemsIds = Promise.all(request.body.orderItems.map(async(orderItem) => {
      const newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        productId: orderItem.productId
      });
      try {
        const createdOrderItem = await newOrderItem.save();
        return createdOrderItem._id;
      } catch (error) {
        return response.status(500).json({ error: 'Server error, order item could not be saved, please try again.\n', Details: `${error}` });
      }
    }));
    const awaitedOrderItemsIds = await orderItemsIds;
    // to calculate the total price.
    const arrayOfTotalPrices = Promise.all(awaitedOrderItemsIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate('productId', 'price'); // the order item has a product so populate
      const totalPriceForItem = orderItem.productId.price * orderItem.quantity;
      return totalPriceForItem;
    }));
    let totalPrice = 0;
    const resolvedArrayOfTotalPrices = await arrayOfTotalPrices;
    for (const i of resolvedArrayOfTotalPrices) {
      totalPrice += i
    }

    const {
      shippingAddress1,
      shippingAddress2,
      city,
      state,
      zip,
      country,
      phone,
      status,
      userId
    } = request.body; 
    const newOrder = new Order({   
      orderItemsIds: awaitedOrderItemsIds, // orderItemsIds is Promisified
      shippingAddress1,
      shippingAddress2,
      city,
      state,
      zip,
      country,
      phone,
      status,
      totalPrice: totalPrice,
      userId  
    });
    console.log('creating new order')
    const createdOrder = await newOrder.save();
    if (!createdOrder) {
      
      return response.status(500).json({ error: `order could not be created, reason: ${error.message}` });
    }
    return response.status(201).json(createdOrder);
  }

  static async updateOrderStatus (request, response) {
    // changes order status from 'pending' to 'shipped' or 'delivered'.
    const {orderId} = request.params;
    const {status} = request.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: status
      },
      { new: true } // new: true ensures that it is the new updated version returned.
      );
    if (!updatedOrder) {
      return response.status(404).json({error: `Order with id: ${orderId}, not found.`})
    }
    return response.status(200).json(updatedOrder);
  }

  static async deleteOrder(request, response) {
    // get id from the parameter in the url.
    const {orderId} = request.params;
    // we need to delete the order items first and then delete the orders
    // so that the database is cleaned up whenever an order is deleted.
    const orderToBeDeleted = await Order.findById(orderId);
    if (orderToBeDeleted) {
      await orderToBeDeleted.orderItemsIds.map(async (orderItemId) => {
        try {
          await findByIdAndRemove(orderItemId);
        } catch (error) {
          return response.status(404).json({ error: `No orderItem with id ${orderItemId}, found.` });
        }
      })
    } else {
      return response.status(404).json({ error: `No order with id ${orderId}, found.` });
    }
    // now that the order items have been deleted, delete the order itself.
    const deletedOrder = await Order.findByIdAndRemove(orderId);
    return response.status(200).json({ status: `Order with id: ${deletedOrder._id}, was deleted succefully.` });
  }

  static async getTotalSales (request, response) {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null, totalSales: {$sum: '$totalPrice'}
        }
      }
    ])
    if (!totalSales) {
      response.status(400).send('Total sales cannot be generated, sorry.')
    }
    response.status(200).json({totalSalesMade: totalSales[0]['totalSales']});
  }

  // count number of orders placed.
  static async countAllOrders (request, response) {
    try {
      const ordersCount = await Order.countDocuments();
      return response.status(200).json({ 'Number of orders in the database': ordersCount });
    } catch (error) {
      return response.status(500).send({ error: `Server error, please try again.\n Details: ${error}` });
    }
  }

  static async getOrderHistoryForUser(request, response) {
    // this simply gets the list of orders made by the particular user
    const {userId} = request.params;
    const userOrdersList = await Order.find({userId: userId}).populate({
      path: 'orderItemsIds', 
      populate: 'productId'
    }).sort({dateOrdered: -1}).select('orderItemsIds');
    // populate fills the category field with all information for the category
    // because of the reference created to the User schema.
    // name means only the name of the user should be gotten, more details can be added like name.
    // {dateOrdered: -1} sorts from NEWEST to OLDEST.
    if (!userOrdersList) {
      return response.status(500).json({ error: `Server error, please try again.\n Details: ${error}` });
    } 
    return response.status(200).send(userOrdersList);
  }
}

export default OrdersController