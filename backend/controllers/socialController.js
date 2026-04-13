const Social = require('../models/Social');

exports.getSocial = async (req, res) => {
    try{
        const social = await Social.findOne();
        res.status(200).json(social || {});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.updateSocial = async (req, res) => {
    try{
        const {linkedin, instagram, facebook} = req.body;
        if(!linkedin || !instagram || !facebook) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const social = await Social.findOneAndUpdate(
            {},
            {linkedin, instagram, facebook},
            {new: true, upsert: true}
        )
        res.status(200).json(social)
        } catch (error) {
            res.status(200).json({message: error.message});
        }
};

exports.clearSocial = async (req, res) => {
    try{
        await Social.deleteMany();
        res.status(200).json({message: 'Social fileds are cleared successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};