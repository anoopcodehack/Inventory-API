const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post("/stock-in", transactionController.stockIn);

router.post("/stock-out", transactionController.stockOut);

router.get("/", transactionController.getTransactions);

router.get("/:id", transactionController.getTransactionById);

module.exports = router;