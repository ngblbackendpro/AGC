const Home = require('../models/Home');

exports.getHomeElements = async (req, res)=> {
    try{
        const home = await Home.findOne();
        res.json(home || {});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.updateHomeElements = async (req, res)=> {
    try {
        const {engagements, industries, partners} = req.body;
        if(!engagements || !industries || !partners) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const home = await Home.findOneAndUpdate(
            {},
            {engagements, industries, partners},
            {new: true, upsert: true}
        )
        res.status(200).json(home);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.clearHomeElements = async (req, res) => {
    try{
        await Home.deleteMany();
        res.status(200).json({message: 'Home elemenets cleared successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};