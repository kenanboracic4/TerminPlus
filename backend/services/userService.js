const bcrypt = require('bcrypt');
const userDao = require('../dao/userDao');

module.exports = {
    async registerUser(name, email, password){
        if( !name || !email || !password){
            throw new Error('Sva polja su obavezna');

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userDao.createUser(name, email, hashedPassword);

        return user;
    }

}