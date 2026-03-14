// Importovanje svih modela tačno po tvom zahtjevu
const User = require('./User');
const Match = require('./Match');
const Sport = require('./Sports_LK');
const Participant = require('./Participant');
const Review = require('./Review'); // Dodano da uvezemo i ocjenjivanje



// 2. Relacije za Sport
Sport.hasMany(Match, { foreignKey: 'sportId' });
Match.belongsTo(Sport, { foreignKey: 'sportId', as: 'sport' });

// 3. Relacije između Korisnika i Termina (Kreator termina)
User.hasMany(Match, { foreignKey: 'creatorId', as: 'CreatedMatches' });
Match.belongsTo(User, { foreignKey: 'creatorId', as: 'Creator' });

// DODAJ OVO: Direktna veza sa modelom Participant (za include i brojanje)
Match.hasMany(Participant, { foreignKey: 'matchId', as: 'participations' });
Participant.belongsTo(Match, { foreignKey: 'matchId' });

User.hasMany(Participant, { foreignKey: 'userId', as: 'participations' });
Participant.belongsTo(User, { foreignKey: 'userId' });
// 4. Many-to-Many: Korisnici prijavljeni na Termin (Učesnici)
User.belongsToMany(Match, {
  through: Participant,
  foreignKey: 'userId',
  as: 'ParticipatingMatches'
});
Match.belongsToMany(User, {
  through: Participant,
  foreignKey: 'matchId',
  as: 'Players'
});

// 5. Relacije za Ocjenjivanje (Review)
// Korisnik koji ostavlja ocjenu
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'GivenReviews' });
Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'Reviewer' });

// Korisnik koji prima ocjenu
User.hasMany(Review, { foreignKey: 'reviewedId', as: 'ReceivedReviews' });
Review.belongsTo(User, { foreignKey: 'reviewedId', as: 'ReviewedUser' });


// Export svih modela kako bi ih koristio u kontrolerima
module.exports = {
  User,
  Match,
  Sport,
  Participant,
  Review
};