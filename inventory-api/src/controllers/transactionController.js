const transactionService = require("../services/transactionService");

exports.stockIn = async (req, res) => {
    try {

        const transaction = await transactionService.stockIn(req.body);

        res.status(201).json({
            success: true,
            message: "Stock added successfully",
            data: transaction
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

exports.stockOut = async (req, res) => {
    try {

        const transaction = await transactionService.stockOut(req.body);

        res.status(201).json({
            success: true,
            message: "Stock removed successfully",
            data: transaction
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

exports.getTransactions = async (req, res) => {

    try {

        const data = await transactionService.getAll();

        res.json({
            success: true,
            count: data.length,
            data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getTransactionById = async (req, res) => {

    try {

        const data = await transactionService.getById(req.params.id);

        res.json({
            success: true,
            data
        });

    } catch (err) {

        res.status(404).json({
            success: false,
            message: err.message
        });

    }

};