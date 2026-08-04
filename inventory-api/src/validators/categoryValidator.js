const { body } = require("express-validator");

exports.categoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Category name must be between 3 and 100 characters"),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters")

];