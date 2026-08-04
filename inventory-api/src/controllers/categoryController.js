const categoryService = require("../services/categoryService");

// ==============================
// CREATE CATEGORY
// ==============================
exports.createCategory = async (req, res) => {
    try {
        const category = await categoryService.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// GET ALL CATEGORIES
// ==============================
exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAll();

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// GET CATEGORY BY ID
// ==============================
exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// UPDATE CATEGORY
// ==============================
exports.updateCategory = async (req, res) => {
    try {
        const category = await categoryService.update(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// DELETE CATEGORY
// ==============================
exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.remove(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};