const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Inventory Dashboard & Analytics
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalProducts:
 *                       type: integer
 *                       example: 25
 *                     totalCategories:
 *                       type: integer
 *                       example: 4
 *                     totalTransactions:
 *                       type: integer
 *                       example: 120
 *                     lowStockProducts:
 *                       type: integer
 *                       example: 3
 *                     outOfStockProducts:
 *                       type: integer
 *                       example: 1
 *                     totalInventoryValue:
 *                       type: number
 *                       example: 456780.50
 *                     averageProductPrice:
 *                       type: number
 *                       example: 18271.22
 *       500:
 *         description: Internal server error
 */
router.get("/", dashboardController.getDashboard);

module.exports = router;