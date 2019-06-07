const mongoose = require('mongoose');


const emailformchema = mongoose.Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String },
    messages: { type: String },
    imagePath: { type: String }

});

module.exports = mongoose.model('Emailform', emailformchema);