const bcrypt = require('bcrypt');
const userDao = require('../dao/userDao');
const jwt = require('jsonwebtoken');

module.exports = {
    async registerUser(name, email, password){
        if( !name || !email || !password){
            throw new Error('Sva polja su obavezna');

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userDao.createUser(name, email, hashedPassword);

        return user;
    },
    async loginUser(email, password){
        if(!email || !password){
            throw new Error('Email i lozinka su obavezni');
        }
        const user = await userDao.getUserByEmail(email);
        if(!user){
            throw new Error('Korisnik nije pronađen!');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new Error('Pogrešna lozinka!');
        }
        const token = jwt.sign({
            userId: user.id,
            name: user.name
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
        );
        return token;
    }

}