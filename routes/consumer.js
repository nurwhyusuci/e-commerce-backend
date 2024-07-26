// routes/consumer.js
const express = require('express');
const consumerController = require('../controllers/consumerController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware); // Middleware untuk otentikasi
router.get('/search-products', consumerController.searchProducts);
router.post('/make-purchase', consumerController.makePurchase);
router.post('/confirm-purchase', consumerController.confirmPurchase);

module.exports = router;
