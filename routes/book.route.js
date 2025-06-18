const express = require("express");
const BookController = require("./../controller/book.controller");

const router = express.Router();

router.post("/new-book", BookController.createBook);
router.get("/all-books", BookController.getAllBooks);
router.get("/book:id", BookController.getBookById);
router.put("/update-book:id", BookController.updateBook);
router.delete("/delete-book:id", BookController.deleteBook);
router.get("/search-by-title", BookController.getBookByTitle);

module.exports = router;