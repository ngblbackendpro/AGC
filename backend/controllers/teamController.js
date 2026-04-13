const Team = require('../models/Team')

exports.getTeam = async (req, res)=> {
    try{
        const data = await Team.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.createTeam = async (req, res)=> {
    try{
    const { name, designation, role, expertise, background, qualifications, personal } = req.body;
    const photo = req.file ? req.file.path : "";

    const team = new Team ({
        name, 
        designation, 
        role, 
        expertise, 
        background, 
        qualifications, 
        personal,
        photo
    });
    await team.save();
    res.status(201).json(team)
   } catch (error) {
    res.status(500).json({message: error.message})
   }
};

exports.updateTeam = async (req, res) => {
    try{
        const { id } = req.params;
        let updateData = { ...req.body };

        if(req.file){
            updateData.photo = req.file.path
        }

        const newUpdate = await Team.findByIdAndUpdate(id, updateData, {new: true});
        res.json(newUpdate);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.deleteTeam = async (req, res)=> {
    try{
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.json({message: "Team deleted"});        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};