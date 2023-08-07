const express = require('express');
const ProductsController = require('../controllers/productsController');
const CategoriesController = require('../controllers/categoriesController');
const UsersController = require('../controllers/usersController');
const OrdersController = require('../controllers/ordersController');
const upload = require('../utils/uploads');

const router = express.Router();

router.get('/products', ProductsController.getAllProducts);
router.get('/products/:productId', ProductsController.getProduct);
router.get('/products/featured/:count?', ProductsController.getAllFeaturedProducts);
router.post('/products/upload', upload.single('image'), ProductsController.createNewProduct);
router.get('/categories', CategoriesController.getAllCategories);
router.get('/categories/:categoryId', CategoriesController.getCategory);
router.post('/categories/upload', CategoriesController.createNewCategory);
router.delete('/delete_category/:categoryId', CategoriesController.deleteCategory);
router.delete('/products/delete/:productId', ProductsController.deleteProduct);
router.put('/categories/update:categoryId', CategoriesController.updateCategory);
router.put('/products/update/:productId', ProductsController.updateProduct);
router.get('/products/count', ProductsController.countAllProducts);
router.get('/products/count/:categoryId', ProductsController.countAllProductsInCategory);
router.post('/register_user', UsersController.createNewUser);
router.get('/users', UsersController.getAllUsers);
router.get('/users/:userId', UsersController.getUser);
router.post('/login', UsersController.loginUser);
router.get('/users/count', UsersController.countAllUsers);
router.delete('/users/delete/:userId', UsersController.deleteUser);
router.get('/orders', OrdersController.getAllOrders)
router.get('/orders/:orderId', OrdersController.getOrder)
router.post('/orders/create', OrdersController.createNewOrder)
router.put('/orders/update/:orderId', OrdersController.updateOrderStatus)
router.delete('/orders/delete/:orderId', OrdersController.deleteOrder);
router.get('/total_sales', OrdersController.getTotalSales);
router.get('/orders/count', OrdersController.countAllOrders);
router.get('/orders/history/:userId', OrdersController.getOrderHistoryForUser);

module.exports = router;
