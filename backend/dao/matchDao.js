const Match = require('../models/Match');
const sequelize = require('../config/db');

module.exports = {
    async createMatch(title, sportId, date, maxPlayers, pricePerPerson, latitude, longitude, address, description, creatorId){
        return await Match.create({
            title,
            sportId,
            date,
            maxPlayers,
            pricePerPerson,
            latitude,
            longitude,
            address,
            description,
            creatorId
        })
    }
}