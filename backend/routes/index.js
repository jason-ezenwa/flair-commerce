const express = require('express');
const ProductsController = require('../controllers/productsController');
const CategoriesController = require('../controllers/categoriesController');
const UsersController = require('../controllers/usersController');
const OrdersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/products', ProductsController.getAllProducts);
router.get('/products/:productId', ProductsController.getProduct);
router.get('/featured_products/:count?', ProductsController.getAllFeaturedProducts);
router.post('/new_product', ProductsController.createNewProduct);
router.get('/categories', CategoriesController.getAllCategories);
router.get('/categories/:categoryId', CategoriesController.getCategory);
router.post('/new_category', CategoriesController.createNewCategory);
router.delete('/delete_category/:categoryId', CategoriesController.deleteCategory);
router.delete('/delete_product/:productId', ProductsController.deleteProduct);
router.put('/update_category/:categoryId', CategoriesController.updateCategory);
router.put('/update_product/:productId', ProductsController.updateProduct);
router.get('/count_products', ProductsController.countAllProducts);
router.get('/count_products/:categoryId', ProductsController.countAllProductsInCategory);
router.post('/register_user', UsersController.createNewUser);
router.get('/users', UsersController.getAllUsers);
router.get('/users/:userId', UsersController.getUser);
router.post('/login', UsersController.loginUser);
router.get('/count_users', UsersController.countAllUsers);
router.delete('/delete_user/:userId', UsersController.deleteUser);
router.get('/orders', OrdersController.getAllOrders)
router.get('/orders/:orderId', OrdersController.getOrder)
router.post('/create_order', OrdersController.createNewOrder)
router.put('/update_order/:orderId', OrdersController.updateOrderStatus)
router.delete('/delete_order/:orderId', OrdersController.deleteOrder);
router.get('/total_sales', OrdersController.getTotalSales);
router.get('/count_orders', OrdersController.countAllOrders);
router.get('/orders_history/:userId', OrdersController.getOrderHistoryForUser);

module.exports = router;
