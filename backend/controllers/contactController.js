const Contact = require('../models/Contact');


exports.getContact = async (req, res) => {
    try{
        const contact = await Contact.findOne();
        res.status(200).json(contact || {});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.updateContact = async (req, res)=> {
    try{
        const {location, email, phone} = req.body;
        if(!location || !email || !phone){
            return res.status(400).json({message: "all fields are required"});
        }
        const contact = await Contact.findOneAndUpdate(
            {},
            {location, email, phone},
            {new: true, upsert: true}
        )
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.clearContact = async (req, res)=> {
    try{
        await Contact.deleteMany();
        res.json({message: 'Contact Cleared'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

