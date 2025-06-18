const book = require('./../model/book.model');

const getAllBooks = async (req, res) => { }
const getBookById = async (req, res) => { }
const createBook = async (req, res) => {

    try {
        const newBook = await book.create({
            title: req.body.title,
            isbn: req.body.isbn,
            author: req.body.author,
            category: req.body.category,
            available_copies: req.body.available_copies || 1,
            total_copies: req.body.total_copies || 1,
            description: req.body.description || '',
            published: req.body.published || new Date().getFullYear(),
            cover_image: req.body.cover_image || ''
        });
        newBook.save();
        return res.status(201).json({ code: 201, message: "Book created successfully", data: newBook });
    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }



}
const updateBook = async (req, res) => { }
const deleteBook = async (req, res) => { }
const getBookByTitle = async (req, res) => { }

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBookByTitle
};