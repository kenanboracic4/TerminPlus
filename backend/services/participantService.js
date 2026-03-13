const participantDao = require('../dao/participantDao');

module.exports = {
    async addParticipant(matchId, userId) {
        return await participantDao.createParticipant(matchId, userId);
    }

}