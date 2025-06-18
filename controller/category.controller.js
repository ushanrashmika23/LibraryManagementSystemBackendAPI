const category = require('./../model/categoty.model');

const getAllCategories = async (req, res) => {
    try {
        const categories = await category.find({});
        res.status(200).json({ code: 200, message: "Categories fetched successfully", data: categories });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ code: 500, message: "Internal server error", data: err.message });
    }
}
const getCategoryById = async (req, res) => {
    try {
        const categoryData = await category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ code: 404, message: "Category not found", data: null });
        }
        res.status(200).json({ code: 200, message: "Category fetched successfully", data: categoryData });
    } catch (err) {
        console.error("Error fetching category by ID:", err);
        res.status(500).json({ code: 500, message: "Internal server error", data: err.message });
    }
}
const createCategory = async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ code: 400, message: "Name and description are required" });
    }
    try {
        const newCategory = new category({
            name: req.body.name,
            description: req.body.description,
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({ code: 201, message: "Category created successfully", data: savedCategory });
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ code: 500, message: "Internal server error", data: err.message });
    }
}
const updateCategory = async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ code: 400, message: "Name and description are required" });
    }
    try {
        const updateData = await category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });

        if (!updateData) {
            return res.status(404).json({ code: 404, message: "Category not found", data: null });
        }
        res.status(200).json({ code: 200, message: "Category updated successfully", date: updateData });

    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ code: 500, message: "Internal server error", data: err.message });
    }

}
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ code: 404, message: "Category not found", data: null });
        }
        res.status(200).json({ code: 200, message: "Category deleted successfully", data: deletedCategory });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ code: 500, message: "Internal server error", data: err.message });
    }
}
const getCategoryByName = async (req, res) => { }

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName
};