
const matchService = require('../services/matchService');

module.exports = {

    async handleAddMatch(req,res){
        const {title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description} = req.body;
        try {
            
            await matchService.addMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, req.user.userId);
            res.status(200).json({message: 'Uspešno kreiran termin!'});
        }catch(error){
            
            console.log(error);
            res.status(500).json({message: error.message});
        }

    },

    async getAllMatches(req,res){
        try {
            const matches = await matchService.getAllMatches();
            
            res.status(200).json(matches);
        }catch(error){
            console.log(error);
            res.status(500).json({message: error.message});
        }
    },
    async getAllSports(req,res){
        try {
            const sports = await matchService.getAllSports();
            
            res.status(200).json(sports);
        }catch(error){
            console.log(error);
            res.status(500).json({message: error.message});
        }
    }
}