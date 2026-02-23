const models = require('../models/index'); 
const sequelize = require('../config/db');


const Sport = models.Sport;

const seedDatabase = async () => {
  try {
  

    await sequelize.sync({ force: false }); 

   

    const sportovi = [
      { name: 'Fudbal', iconUrl: 'soccer.png' },
      { name: 'Basket', iconUrl: 'basket.png' },
      { name: 'Tenis', iconUrl: 'tennis.png' }
    ];

    await Sport.bulkCreate(sportovi);
    console.log('✅ Sportovi dodani!');

    process.exit();
  } catch (error) {
    console.error('❌ Greška:', error.message);
    process.exit(1);
  }
};

seedDatabase();