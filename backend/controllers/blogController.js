const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
    try{
        const blog = await Blog.find().sort({date: -1});
        res.json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createBlogs = async (req, res) => {
    try{
        const{ title, description, category, date } = req.body;
        const image = req.file ? req.file.path : "";
        
        const blog = new Blog({
            title,
            description,
            category,
            date,
            image
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateBlogs = async (req, res) => {
    try{
        const { id } = req.params;

        let updateData = { ...req.body }
        if(req.file) {
            updateData.image = req.file.path
        }

        const blog = await Blog.findByIdAndUpdate(id, updateData, {new: true});
        res.json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.deleteBlogs = async (req, res) => {
    try{
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.json({message: 'Blog Deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

