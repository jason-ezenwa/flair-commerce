// this file contains functions for Product endpoints operations
const Category = require('../models/category');
const Product = require('../models/product');

class ProductsController {
  // sends all products in products collection
  static async getAllProducts(request, response) {
    try {
      // for filtering purposes.
      let filter = {};
      if (request.query.categories) {
        filter = { categoryId: request.query.categories.split(',') };
        // category will be an array of categories
      }
      const productsList = await Product.find(filter);
      return response.status(200).send(productsList);
    } catch (error) {
      return response.status(500).send({ error: `Server error, please try again.\n Details: ${error}` });
    }
  }

  // get one product by id
  static async getProduct(request, response) {
    const {productId} = request.params;
    const product = await Product.findById(productId).populate('categoryId');
    // populate fills the category field with all information for the category
    // because of the reference created to the Category schema
    if (!product) {
      return response.status(404).json({ error: `Product with id ${productId} not found. Please check the ID and try again.` });
    }
    return response.status(200).send(product);
  }

  // get only featured products.
  static async getAllFeaturedProducts(request, response) {
    // make count the count url paramter if it is provided, else give it 0
    // 0 means no limit to the number of featured products returned
    const count = parseInt(request.params.count) ? request.params.count : 0;
    const productsList = await Product.find({ isFeatured: true }).limit(count);
    if (!productsList) {
      return response.status(500).send({ error: 'Server error, please try again', Details: `${error}` });
    }
    return response.status(200).send(productsList);
  }

  // create new product
  static async createNewProduct(request, response) {
    const category = await Category.findById(request.body.categoryId);
    if (!category) {
      return response.status(404).json({ error: `category with id: ${request.body.category}, not found.` });
    }

    const newProduct = new Product({
      name: request.body.name,
      image: request.body.image,
      images: request.body.images,
      description: request.body.description,
      richDescription: request.body.richDescription,
      brand: request.body.brand,
      price: request.body.price,
      categoryId: request.body.categoryId,
      countInStock: request.body.countInStock,
      rating: request.body.rating,
      numReviews: request.body.numReviews,
      isFeatured: request.body.isFeatured,
      dateCreated: request.body.dateCreated,
    });

    try {
      const createdProduct = await newProduct.save();
      return response.status(201).json(createdProduct);
    } catch (error) {
      return response.status(500).json({ error: `could not create product: ${error.message}` });
    }
  }

  static async deleteProduct(request, response) {
    // get id from the parameter in the url.
    const {productId} = request.params;
    try {
      const deletedProduct = await Product.findByIdAndRemove(productId);
      return response.status(200).json({ status: `Product with id: ${deletedProduct._id}, was deleted succefully.` });
    } catch (error) {
      return response.status(404).json({ error: `No product with id ${productId}, found.` });
    }
  }

  static async updateProduct(request, response) {
    // validate category first
    const category = await Category.findById(request.body.categoryId);
    if (!category) {
      return response.status(404).json({ error: `category with id: ${request.body.category}, not found.` });
    }
    const {productId} = request.params;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name: request.body.name,
          image: request.body.image,
          images: request.body.images,
          description: request.body.description,
          richDescription: request.body.richDescription,
          brand: request.body.brand,
          price: request.body.price,
          categoryId: request.body.categoryId,
          countInStock: request.body.countInStock,
          rating: request.body.rating,
          numReviews: request.body.numReviews,
          isFeatured: request.body.isFeatured,
          dateCreated: request.body.dateCreated,
        },
        { new: true }, // new: true ensures that it is the new updated version returned.
      );
      return response.status(200).json(updatedProduct);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  static async countAllProducts(request, response) {
    try {
      const productsCount = await Product.countDocuments();
      return response.status(200).json({ 'Number of products in the database': productsCount });
    } catch (error) {
      return response.status(500).send({ error: `Server error, please try again.\n Details: ${error}` });
    }
  }

  // count products in specified category
  static async countAllProductsInCategory(request, response) {
    const { categoryId } = request.params;
    const category = await Category.findById(request.body.categoryId);
    console.log(category);
    if (!category) {
      return response.status(404).json({ error: `category with id: ${categoryId}, not found.` });
    }
    try {
      const productsCount = await Product.countDocuments({ categoryId: categoryId });
      return response.status(200).json({ Details: `You have ${productsCount} ${category.name} products`, count: productsCount });
    } catch (error) {
      return response.status(500).send({ error: `Server error, please try again.\n Details: ${error}` });
    }
  }
}

module.exports = ProductsController;
