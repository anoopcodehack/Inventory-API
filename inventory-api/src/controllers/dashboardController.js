const dashboardService = require("../services/dashboardService");

exports.getDashboard = async (req, res) => {
    try {

        const data = await dashboardService.getDashboard();

        res.status(200).json({
            success: true,
            data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};