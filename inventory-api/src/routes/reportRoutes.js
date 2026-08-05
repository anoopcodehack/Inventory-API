const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Export Inventory Reports
 */

/**
 * @swagger
 * /api/reports/products/csv:
 *   get:
 *     summary: Export all products as CSV
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Products CSV downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
router.get(
    "/products/csv",
    reportController.exportProductsCSV
);

/**
 * @swagger
 * /api/reports/transactions/csv:
 *   get:
 *     summary: Export all transactions as CSV
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Transactions CSV downloaded successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
router.get(
    "/transactions/csv",
    reportController.exportTransactionsCSV
);

module.exports = router;