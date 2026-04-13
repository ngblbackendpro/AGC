const mongoose = require('mongoose')
const teamSchema = new mongoose.Schema({
    name: String,
    designation: String,
    role: String,
    expertise: String,
    background: String,
    qualifications: String,
    personal: String,
    photo: String
}, {timestamps: true});

module.exports = mongoose.model('Team', teamSchema);
