const Participant = require('../models/Participant');
const Match = require('../models/Match');
const sequelize = require('../config/db');

module.exports = {
    async createParticipant(matchId, userId) {
        const createdParticipant = await Participant.create({
            matchId,
            userId
        });

        await Match.increment('currentPlayers', {
            by: 1,
            where: { id: matchId }
        });


        return createdParticipant;
    },

    async cancelParticipant(matchId, userId) {
        return await Participant.destroy({
            where: {
                matchId,
                userId
            }
        });

    },


}