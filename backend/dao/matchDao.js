const Match = require('../models/Match');
const Sport = require('../models/Sports_LK');
const sequelize = require('../config/db');
const { literal } = require('sequelize');

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
    },
    async getAllMatches(){
        return await Match.findAll(
            {
                include: { model: Sport, as: 'sport' },
                limit: 10
            }
        );
    }
}