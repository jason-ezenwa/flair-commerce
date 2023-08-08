// Order model
import { Schema, model } from 'mongoose';

const orderItemSchema = Schema({
  quantity: {
    type: Number,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
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

const OrderItem = model('OrderItem', orderItemSchema, 'orderItems');
export default OrderItem;