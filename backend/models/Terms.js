const mongoose = require('mongoose');

const termsSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Terms', termsSchema);