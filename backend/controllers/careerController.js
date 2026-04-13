const Career = require('../models/Career');

exports.getCareers = async (req, res)=> {
    try{
        const allCareer = await Career.find();
        res.json(allCareer);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createCareer = async (req, res) => {
    try{
        const { title, type, mode, description, applyLink } = req.body;

        if (!title || !type || !mode || !description || !applyLink) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const career = new Career({
            title,
            type,
            mode,
            description,
            applyLink
        });
        await career.save();
        res.status(201).json(career);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateCareer = async (req, res)=> {
    try{
        const { id } = req.params;
        let updateData = { ...req.body };
        const update = await Career.findByIdAndUpdate(id, updateData, {new: true});
        res.json(update);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteCareer = async (req, res)=> {
    try{
        await Career.findByIdAndDelete(req.params.id)
        res.json({message: 'Career Deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};