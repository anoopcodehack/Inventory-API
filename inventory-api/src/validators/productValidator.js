const { body } = require("express-validator");

exports.productValidation = [

    body("category_id")
        .notEmpty()
        .isUUID()
        .withMessage("Valid category_id is required"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2, max: 150 }),

    body("sku")
        .trim()
        .notEmpty()
        .withMessage("SKU is required"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be positive"),

    body("quantity")
        .isInt({ min: 0 })
        .withMessage("Quantity must be zero or more"),

    body("minimum_stock")
        .isInt({ min: 0 })
        .withMessage("Minimum stock must be zero or more"),

    body("image_url")
        .optional()
        .isURL()
        .withMessage("Invalid image URL")

];