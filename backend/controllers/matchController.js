
const matchService = require('../services/matchService');
const participantService = require('../services/participantService');

module.exports = {

    async handleAddMatch(req, res) {
        const { title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description } = req.body;
        try {

            await matchService.addMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, req.user.userId, req.user.name);
            res.status(200).json({ message: 'Uspešno kreiran termin!' });
        } catch (error) {

            console.log(error);
            res.status(500).json({ message: error.message });
        }

    },

    async getAllMatches(req, res) {
        try {
            const matches = await matchService.getAllMatches();

            res.status(200).json(matches);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    async getAllSports(req, res) {
        try {
            const sports = await matchService.getAllSports();

            res.status(200).json(sports);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    async handleJoinMatch(req, res) {
        try {
            const { id } = req.params;
            console.log("id", id);
            console.log("userid", req.user.id);
            await participantService.addParticipant(id, req.user.userId);
            res.status(200).json({ message: 'Uspješno ste se pridružili terminu!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    async handleCancelMatch(req, res) {
        try {
            const { id } = req.params;
            await participantService.cancelParticipant(id, req.user.userId);
            res.status(200).json({ message: 'Uspješno ste otkazali termin!' });
        } catch (error) {
            console.log(error);
        }
    }
}