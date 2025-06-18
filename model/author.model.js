const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({

    name:{ type: String, required: true },
    bio: { type: String, default: '' },
    birth_date: { type: Date },
    nationality: { type: String, default: '' },

});

module.exports = mongoose.model('Author', authorSchema);