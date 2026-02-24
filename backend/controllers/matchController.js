
const matchService = require('../services/matchService');

module.exports = {

    async handleAddMatch(req,res){
        const {title, sportId, date, maxPlayers, pricePerPerson, latitude, longitude, address, description} = req.body;
        try {
            console.log(req.userId);
            await matchService.addMatch(title, sportId, date, maxPlayers, pricePerPerson, latitude, longitude, address, description, req.userId);
            res.status(200).json({message: 'Uspešno kreiran termin!'});
        }catch(error){
            console.log(error);
            res.status(500).json({message: error.message});
        }

    }
}