const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    date: String,
    image: String
}, {timestamps:true});

module.exports = mongoose.model('blog', blogSchema);