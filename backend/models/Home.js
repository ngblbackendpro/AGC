const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    engagements: {
        type: String,
        required: true
    },
    industries: {
        type: String,
        required: true
    },
    partners: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Home', homeSchema);