import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const getProducts = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await Product.find({ userId });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, quantity, price, image, status } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Product name is required" });
        }
        if (price < 0) {
            return res.status(400).json({ success: false, message: "Price cannot be negative" });
        }
        if (quantity < 0) {
            return res.status(400).json({ success: false, message: "Quantity cannot be negative" });
        }

        const product = await Product.create({
            name,
            description,
            quantity,
            price,
            image,
            status,
            userId: req.userId
        });

        res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, quantity, price, image, status } = req.body;

        if (price !== undefined && price < 0) {
            return res.status(400).json({ success: false, message: "Price cannot be negative" });
        }
        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({ success: false, message: "Quantity cannot be negative" });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, quantity, price, image, status },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductStats = async (req, res) => {
    try {
        const userId = req.userId;
        
        const totalProducts = await Product.countDocuments({ userId });
        const lowStockProducts = await Product.countDocuments({ 
            userId, 
            quantity: { $lt: 5 } 
        });
        
        const result = await Product.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
                    totalQuantity: { $sum: '$quantity' }
                }
            }
        ]);

        const stats = {
            totalProducts,
            totalQuantity: result[0]?.totalQuantity || 0,
            totalValue: result[0]?.totalValue || 0,
            lowStockProducts
        };

        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductStats };