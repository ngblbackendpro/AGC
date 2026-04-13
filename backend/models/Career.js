const mongoose = require('mongoose');
const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["Full Time", "Part Time"],
        required: true 
    },

    mode: {
        type: String,
        enum : ["Hybrid", "Remote", "Onsite"],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    applyLink: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('career', careerSchema);