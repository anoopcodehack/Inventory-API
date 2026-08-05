require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// Swagger
const { swaggerUi, swaggerSpec } = require("./config/swagger");

// Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

// ==============================
// Health Check
// ==============================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Inventory API Running 🚀"
    });
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

// ==============================
// Swagger Documentation
// ==============================
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;