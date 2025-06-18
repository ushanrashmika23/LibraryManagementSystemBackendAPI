const mongoose = require('mongoose');
const memberScema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    joined_date: { type: Date, default: Date.now },
    membership_id: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true },
    is_verified: { type: Boolean, default: false },
    borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book',default: [] }],
});

module.exports = mongoose.model('Member', memberScema);