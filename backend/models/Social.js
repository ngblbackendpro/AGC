const mongoose = require('mongoose')

const socialSchema = new mongoose.Schema({
    linkedin: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Social', socialSchema);
