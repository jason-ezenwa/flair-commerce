// product model
import { Schema, model } from 'mongoose';

// product collection schema
const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [
    { type: String },
  ],
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: '',
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  categoryId: { // a categoryId
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  // isFeatured determines if product will be  in featured section.
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// sorting out the id which is represented as '_id' usually.
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
productSchema.set('toJSON', {
  virtuals: true,
});

const Product = model('Product', productSchema, 'products');
export default Product;
