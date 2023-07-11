// Order model
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderItemsIds: [{ // an array of orderItem Ids
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'OrderItem',
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true
  },
  shippingAddress2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pending' // will be pending until it is updated by admin.
  },
  totalPrice: {
    type: Number,
  },
  userId: { // a UserId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  },
});

// sorting out the id which is represented as '_id' usually.
orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
orderSchema.set('toJSON', {
  virtuals: true,
});

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;