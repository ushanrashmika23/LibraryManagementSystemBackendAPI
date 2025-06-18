const express = require('express');
const AuthorController = require('./../controller/author.controller');

const router = express.Router();

router.get('/all-authors', AuthorController.getAllAuthors);
router.get('/author/:id', AuthorController.getAuthorById);
router.post('/new-author', AuthorController.createAuthor);
router.put('/update-author/:id', AuthorController.updateAuthor);
router.delete('/delete-author/:id', AuthorController.deleteAuthor);

module.exports = router;