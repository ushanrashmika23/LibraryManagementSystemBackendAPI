const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    reservation_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'notified', 'collected'], default: 'active' },
});
module.exports = mongoose.model('Reservation', reservationSchema);