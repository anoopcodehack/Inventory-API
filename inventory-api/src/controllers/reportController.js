const reportService = require("../services/reportService");

exports.exportProductsCSV = async (req, res) => {
    try {

        const csv = await reportService.productsCSV();

        res.header("Content-Type", "text/csv");
        res.attachment("products.csv");

        return res.send(csv);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.exportTransactionsCSV = async (req, res) => {
    try {

        const csv = await reportService.transactionsCSV();

        res.header("Content-Type", "text/csv");
        res.attachment("transactions.csv");

        return res.send(csv);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};