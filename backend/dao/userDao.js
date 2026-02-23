const User = require('../models/User');
const sequelize = require('../config/db');

module.exports = {
    async createUser(name, email,password){
        return await User.create({
            name,
            email,
            password
        })
    },
    async getUserByEmail(email){
        return await User.findOne({
            where: {email}
        })
    }
}