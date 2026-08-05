const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Inventory Stock Transactions
 */

/**
 * @swagger
 * /api/transactions/stock-in:
 *   post:
 *     summary: Add stock to a product
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 59d997d0-0305-470f-b7f9-637dbb5124e7
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               notes:
 *                 type: string
 *                 example: New shipment received
 *     responses:
 *       201:
 *         description: Stock added successfully
 *       400:
 *         description: Invalid request
 */
router.post("/stock-in", transactionController.stockIn);

/**
 * @swagger
 * /api/transactions/stock-out:
 *   post:
 *     summary: Remove stock from a product
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 59d997d0-0305-470f-b7f9-637dbb5124e7
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               notes:
 *                 type: string
 *                 example: Sold to customer
 *     responses:
 *       201:
 *         description: Stock removed successfully
 *       400:
 *         description: Insufficient stock or invalid request
 */
router.post("/stock-out", transactionController.stockOut);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 */
router.get("/", transactionController.getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction UUID
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", transactionController.getTransactionById);

module.exports = router;