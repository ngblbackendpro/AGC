const Inquiry = require('../models/Inquiry');


exports.getInquiry = async (req, res) => {
    try{
        const inqueries = await Inquiry.find().sort({createdAt : -1});
        res.status(200).json(inqueries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createInquiry = async (req, res)=> {
    try{
        const {name, email, company, message} = req.body;
        if(!name || !email || !message) {
            res.status(400).json({message: 'all fields are required'});
        }
        const inquiry = await Inquiry.create({
            name,
            email,
            company,
            message
        });
       await inquiry.save();
       res.status(201).json(inquiry);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};