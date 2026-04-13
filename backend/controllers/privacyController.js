const Privacy = require('../models/Privacy');


exports.getPrivacy = async (req, res)=> {
    try {
        const privacy = await Privacy.findOne();
        res.status(200).json(privacy || {});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


exports.updatePrivacy = async (req, res) => {
    try{
        const { privacy }  = req.body;
        if(!privacy){
            return res.status(400).json({message: 'please fill the field'});
        }
        const updatePrivacy = await Privacy.findOneAndUpdate(
            {},
            {privacy},
            {new: true, upsert: true}
        );
        res.status(200).json(updatePrivacy);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.clearPrivacy = async (req, res) => {
    try{
        await Privacy.deleteMany();
        res.status(200).json({message: 'Privacy has cleared successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};