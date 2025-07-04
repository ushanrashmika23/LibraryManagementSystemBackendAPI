const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    created_at: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now }
});