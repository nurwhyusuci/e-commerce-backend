// controllers/adminController.js
const Product = require('../models/product');
const Order = require('../models/order');

// Mengelola Produk
exports.manageProducts = async (req, res, next) => {
    try {
        console.log('Request received at manageProducts');
        const { name, price, stock } = req.body;
        console.log('Creating product with data:', { name, price, stock });
        const product = await Product.create({ name, price, stock });
        console.log('Product created:', product);
        res.status(201).json({ message: 'Product created!', product });
    } catch (error) {
        console.error('Error in manageProducts:', error);
        next(error);
    }
};

// Mengelola Pesanan
exports.manageOrders = async (req, res, next) => {
    try {
        console.log('Request received at manageOrders');
        const { orderId, status } = req.body;
        console.log('Updating order with data:', { orderId, status });
        
        const order = await Order.findByPk(orderId);
        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        
        order.status = status;
        await order.save();
        
        console.log('Order updated:', order);
        res.status(200).json({ message: 'Order updated!', order });
    } catch (error) {
        console.error('Error in manageOrders:', error);
        next(error);
    }
};
