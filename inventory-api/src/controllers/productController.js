const productService = require("../services/productService");

// ==============================
// CREATE PRODUCT
// ==============================
exports.createProduct = async (req, res) => {
    try {
        const product = await productService.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// GET ALL PRODUCTS
// ==============================
exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getAll(req.query);

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// GET PRODUCT BY ID
// ==============================
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// UPDATE PRODUCT
// ==============================
exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.update(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// DELETE PRODUCT
// ==============================
exports.deleteProduct = async (req, res) => {
    try {
        await productService.remove(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// LOW STOCK PRODUCTS
// ==============================
exports.getLowStockProducts = async (req, res) => {
    try {
        const products = await productService.getLowStock();

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};