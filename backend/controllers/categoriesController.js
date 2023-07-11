// this file contains functions for Category endpoints operations
const Category = require('../models/category');

class CategoriesController {
  // sends all categories in categories collection
  static async getAllCategories(request, response) {
    try {
      const categoriesList = await Category.find();
      return response.status(200).send(categoriesList);
    } catch (error) {
      return response.status(500).json({ error: `Server error, please try again.\n Details: ${error}` });
    }
  }

  // get specific category
  static async getCategory(request, response) {
    const {categoryId} = request.params;
    try {
      const category = await Category.findById(categoryId);
      return response.status(200).send(category);
    } catch (error) {
      return response.status(404).json({ error: `No category with id ${categoryId}, found.` });
    }
  }

  // create new category
  static async createNewCategory(request, response) {
    const newCategory = new Category({
      name: request.body.name,
      icon: request.body.icon,
      color: request.body.color,
    });
    const createdCategory = await newCategory.save();
    if (!createdCategory) {
      return response.status(500).json({ error });
    }
    return response.status(201).json(createdCategory);
  }

  static async deleteCategory(request, response) {
    // get id from the parameter in the url.
    const {categoryId} = request.params;
    try {
      const deletedCategory = await Category.findByIdAndRemove(categoryId);
      return response.status(200).json({ status: `Category with id: ${deletedCategory._id}, was deleted succefully.` });
    } catch (error) {
      return response.status(404).json({ error: `No category with id ${categoryId}, found.` });
    }
  }

  static async updateCategory(request, response) {
    const {categoryId} = request.params;
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
          name: request.body.name,
          icon: request.body.icon,
          color: request.body.color,
        },
        { new: true }, // new: true ensures that it is the new updated version returned.
      );
      return response.status(200).json(updatedCategory);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}

module.exports = CategoriesController;
