const Match = require('../models/Match');
const Sport = require('../models/Sports_LK');
const Participant = require('../models/Participant');
const sequelize = require('../config/db');
const { literal } = require('sequelize');
const { Op } = require('sequelize');

module.exports = {
    async createMatch(title, sportId, date, neededPlayers, pricePerPerson, latitude, longitude, address, description, creatorId, creatorName) {
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
    async getAllMatches(userId = null) {

        await Match.update(
            { status: 'Završeno' },
            {
                where: {
                    date: { [Op.lt]: new Date() },
                    status: 'Aktivno'
                }
            }
        );
        const matches = await Match.findAll({
            include: [
                { model: Sport, as: 'sport' },

                {
                    model: Participant,
                    as: 'participations',
                    attributes: ['userId']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: 10
        });


        return matches.map(match => {
            const plainMatch = match.get({ plain: true });


            plainMatch.isUserJoined = userId
                ? plainMatch.participations.some(p => p.userId === userId)
                : false;


            plainMatch.currentPlayers = plainMatch.participations.length;

            return plainMatch;
        });
    },
    async getAllSports() {
        console.log("dao");
        return await Sport.findAll();
    },
    async getUserMatches(userId) {
        return await Match.findAll({
            include: [
                { model: Participant, as: 'participations', where: { userId } }
            ]
        });
    }
}