const { Op } = require('sequelize');
const Product = require('../models/product');
const Order = require('../models/order');

exports.searchProducts = async (req, res, next) => {
    try {
        console.log('Request received at searchProducts');
        const { query } = req.query;  // Changed from req.body to req.query for GET request
        console.log('Searching products with query:', query);

        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        console.log('Products found:', products);
        res.status(200).json({ message: 'Products found!', products });
    } catch (error) {
        console.error('Error in searchProducts:', error);
        next(error);
    }
};

exports.makePurchase = async (req, res, next) => {
    try {
        console.log('Request received at makePurchase');
        const { productId, quantity } = req.body;
        console.log('Making purchase with data:', { productId, quantity });

        const product = await Product.findByPk(productId);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        if (product.stock < quantity) {
            const error = new Error('Insufficient stock');
            error.statusCode = 400;
            throw error;
        }

        const userId = req.userId; // Assuming userId is available in request (from auth middleware)
        const order = await Order.create({
            userId,
            productId,
            quantity,
            totalPrice: product.price * quantity
        });

        product.stock -= quantity;
        await product.save();

        console.log('Order created:', order);
        res.status(201).json({ message: 'Order created!', order });
    } catch (error) {
        console.error('Error in makePurchase:', error);
        next(error);
    }
};

exports.confirmPurchase = async (req, res, next) => {
    try {
        console.log('Request received at confirmPurchase');
        const { orderId, confirmation } = req.body;
        console.log('Confirming purchase with data:', { orderId, confirmation });

        const order = await Order.findByPk(orderId);
        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }

        order.confirmation = confirmation;
        await order.save();

        console.log('Order confirmed:', order);
        res.status(200).json({ message: 'Order confirmed!', order });
    } catch (error) {
        console.error('Error in confirmPurchase:', error);
        next(error);
    }
};
