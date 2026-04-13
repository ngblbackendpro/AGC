const Terms = require('../models/Terms');

exports.getTerms = async (req, res) => {
    try{
        const terms = await Terms.find().sort({ createdAt: 1 });;
        res.status(200).json(terms || {});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.createTerms = async (req, res) => {
    try{
        const { heading, summary } = req.body;
        if(!heading || !summary){
           return res.status(400).json({message: 'All fields are required'});
        }
        const createTerms = new Terms({
            heading,
            summary
        });
        await createTerms.save();
        res.status(200).json(createTerms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateTerms = async (req, res) => {
    try{
        const { id } = req.params;

        let updateData = { ...req.body }
        if(req.file) {
            updateData.image = req.file.path
        }

        const term = await Terms.findByIdAndUpdate(id, updateData, {new: true});
        res.json(term);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.clearTerms = async (req, res) => {
    try{
        const { id } = req.params;
        await Terms.findByIdAndDelete(id);
        res.json('term has deleted');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}