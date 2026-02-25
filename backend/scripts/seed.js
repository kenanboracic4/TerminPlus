const models = require('../models/index'); 
const sequelize = require('../config/db');

const Sport = models.Sport;

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); 

    const sportovi = [
      { name: 'Fudbal', iconUrl: 'soccer.png' },
      { name: 'Basket', iconUrl: 'basketball.png' },
      { name: 'Tenis', iconUrl: 'tennis.png' },
      { name: 'Odbojka', iconUrl: 'volleyball.png' },
      { name: 'Rukomet', iconUrl: 'handball.png' },
      { name: 'Stoni tenis', iconUrl: 'ping-pong.png' },
      { name: 'Padel', iconUrl: 'padel.png' },
      { name: 'Badminton', iconUrl: 'badminton.png' },
      { name: 'Trčanje', iconUrl: 'running.png' },
      { name: 'Teretana', iconUrl: 'gym.png' },
      { name: 'Plivanje', iconUrl: 'swimming.png' },
      { name: 'Biciklizam', iconUrl: 'cycling.png' }
    ];

    await Sport.bulkCreate(sportovi);
    console.log(' Sportovi dodani!');
    process.exit();
  } catch (error) {
    console.error('Greška:', error.message);
    process.exit(1);
  }
};

seedDatabase();