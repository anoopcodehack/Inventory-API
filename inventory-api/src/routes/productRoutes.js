const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { productValidation } = require("../validators/productValidator");
const { validationResult } = require("express-validator");

// ==============================
// Validation Middleware
// ==============================
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/",
    productValidation,
    validate,
    productController.createProduct
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /api/products/low-stock/list:
 *   get:
 *     summary: Get all low stock products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Low stock products
 */
router.get(
    "/low-stock/list",
    productController.getLowStockProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put(
    "/:id",
    productValidation,
    validate,
    productController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;