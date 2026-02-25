const Match = require('../models/Match');
const Sport = require('../models/Sports_LK');
const sequelize = require('../config/db');
const { literal } = require('sequelize');

module.exports = {
    async createMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, creatorId,creatorName){
        return await Match.create({
            title,
            sportId,
            date,
            neededPlayers,
            pricePerPerson,
            latitude,
            longitude,
            address,
            description,
            creatorId,
            creatorName
        })
    },
    async getAllMatches(){
        return await Match.findAll(
            {
                include: { model: Sport, as: 'sport' },
                limit: 10
            }
        );
    },
    async getAllSports(){
        console.log("dao");
        return await Sport.findAll();
    }
}