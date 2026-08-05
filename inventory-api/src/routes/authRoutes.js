const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anoop
 *               email:
 *                 type: string
 *                 example: anoop@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request
 */
router.post("/register", auth.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: anoop@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", auth.login);

module.exports = router;