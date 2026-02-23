const userService = require('../services/userService');

module.exports = {

    async handleRegisterUser(req,res){
        const {name, email, password} = req.body;
        try {
           await userService.registerUser(name, email, password);
           res.status(200).json({message: 'Uspešna registracija!'});

        } catch (error) {
            res.status(500).json({message: error.message});

        }
    }
}