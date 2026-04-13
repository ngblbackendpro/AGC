const mongoose = require('mongoose');

const privacySchema = new mongoose.Schema({
    privacy: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Privacy', privacySchema);