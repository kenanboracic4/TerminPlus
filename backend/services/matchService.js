const matchDao = require('../dao/matchDao');

module.exports = {
    async addMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, userId){
        console.log("service", title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, userId);
        if(!title || !sportId || !date || !neededPlayers || !pricePerPerson || !latitude || !longitude || !address || !description){
            throw new Error('Sva polja su obavezna');
        }
        return await matchDao.createMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, userId);

    },

    async getAllMatches(){
        return await matchDao.getAllMatches();
    },

    async getAllSports(){
        console.log("servis");
        return await matchDao.getAllSports();
    }
}