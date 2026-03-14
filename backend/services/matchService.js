const matchDao = require('../dao/matchDao');

module.exports = {
    async addMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, userId, name) {
        console.log("service", title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, userId, name);
        if (!title || !sportId || !date || !neededPlayers || !pricePerPerson || !latitude || !longitude || !address || !description) {
            throw new Error('Sva polja su obavezna');
        }
        return await matchDao.createMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, userId, name);

    },

    async getAllMatches(id) {
        return await matchDao.getAllMatches(id);
    },

    async getAllSports() {
        console.log("servis");
        return await matchDao.getAllSports();
    }
}