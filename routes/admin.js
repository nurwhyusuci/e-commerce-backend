// routes/admin.js
const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware); // Middleware untuk otentikasi
router.post('/manage-products', adminController.manageProducts);
router.post('/manage-orders', adminController.manageOrders);

module.exports = router;