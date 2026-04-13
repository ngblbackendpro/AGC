const FAQ = require('../models/FAQ');

exports.getFAQ = async (req, res)=> {
    try{
        const faq = await FAQ.find();
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createFAQ = async (req, res) => {
    try{
        const faq = new FAQ(req.body);
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateFAQ = async (req, res) => {
    try{
        const { id } = req.params;
        let updateData = { ...req.body };
        const updated = await FAQ.findByIdAndUpdate(id, updateData, {new: true});
        res.json(updated);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.deleteFAQ = async (req, res)=> {
    try{
        await FAQ.findByIdAndDelete(req.params.id);
        res.json({message: "FAQ Deleted"});
    } catch (error) {
        res.json(500).json({message: error.message})
    }
};