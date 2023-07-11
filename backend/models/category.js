// Category model
const mongoose = require('mongoose');

// product collection schema
const categorySchema = mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema, 'categories');
module.exports = Category;
