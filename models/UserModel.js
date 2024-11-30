const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    book_title: {
        type: String,
        required: true
    },
    book_author: {
        type: String,
        required: true,
    },
    book_price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;