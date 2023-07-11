// Order model
const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

// sorting out the id which is represented as '_id' usually.
orderItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
orderItemSchema.set('toJSON', {
  virtuals: true,
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema, 'orderItems');
module.exports = OrderItem;