// Category model
import { Schema, model } from 'mongoose';

// product collection schema
const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

const Category = model('Category', categorySchema, 'categories');
export default Category;
