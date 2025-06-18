const express = require("express");
const CategoryController = require("./../controller/category.controller");

const router = express.Router();

router.post("/new-category", CategoryController.createCategory);
router.put("/update-category/:id",CategoryController.updateCategory);
router.delete("/delete-category/:id", CategoryController.deleteCategory);
router.get("/all-categories", CategoryController.getAllCategories);
router.get("/category/:id", CategoryController.getCategoryById);

module.exports = router;