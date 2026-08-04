const authService = require("../services/authService");

exports.register = async (req, res) => {

    try {

        const { full_name, email, password } = req.body;

        const user =
            await authService.register(
                full_name,
                email,
                password
            );

        res.status(201).json({

            success: true,

            user

        });

    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const data =
            await authService.login(
                email,
                password
            );

        res.json({

            success: true,

            session: data.session,

            user: data.user

        });

    } catch (err) {

        res.status(401).json({

            success: false,

            message: err.message

        });

    }

};