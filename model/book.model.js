const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    available_copies: { type: Number, default: 1 },
    total_copies: { type: Number, default: 1 },
    description: { type: String, default: '' },
    published: { type: Number},
    cover_image: { type: String, default: '' },
});

module.exports = mongoose.model('Book', bookSchema);