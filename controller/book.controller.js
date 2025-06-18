const book = require('./../model/book.model');

const getAllBooks = async (req, res) => { }
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookData = await book.findById(bookId).populate('author category');
        if (!bookData) {
            return res.status(404).json({ code: 404, message: "Book not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Book retrieved successfully", data: bookData });
    } catch (error) {
        console.error('Error retrieving book:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
}
const createBook = async (req, res) => {
    try {
        const { title, isbn, author, category } = req.body;
        if (!title || !isbn || !author || !category) {
            return res.status(400).json({
                code: 400,
                message: "Bad Request",
                data: "Title, ISBN, Author, and Category fields are required"
            });
        }

        const newBook = await book.create({
            title,
            isbn,
            author,
            category,
            status: req.body.status || 'Available',
            description: req.body.description || '',
            published: req.body.published || new Date().getFullYear(),
            cover_image: req.body.cover_image || ''
        });

        return res.status(201).json({ code: 201, message: "Book created successfully", data: newBook });
    } catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
};

const updateBook = async (req, res) => {
    if (!req.body.title || !req.body.isbn || !req.body.author || !req.body.category) {
        return res.status(400).json({ code: 400, message: "Bad Request", data: "Title, ISBN, Author, and Category fields are required" });
    }

    try {
        const updatedBook = await book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ code: 404, message: "Book not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Book updated successfully", data: updatedBook });
    } catch (err) { }

}
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ code: 404, message: "Book not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Book deleted successfully", data: deletedBook });
    } catch (err) {
        console.error('Error deleting book:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const getBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const { page = 1, limit = 10 } = req.query;

        let query = {};
        if (title && title.trim() !== "") {
            query.title = { $regex: title, $options: 'i' };
        }

        const books = await book.find(query)
            .populate('author category')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await book.countDocuments(query);

        return res.status(200).json({
            code: 200,
            message: "Books retrieved successfully",
            data: books,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error retrieving books by title:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBookByTitle
};