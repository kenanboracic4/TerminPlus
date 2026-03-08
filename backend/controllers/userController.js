const userService = require('../services/userService');

module.exports = {

    async handleRegisterUser(req, res) {
        const { name, email, password } = req.body;
        try {
            await userService.registerUser(name, email, password);
            res.status(200).json({ message: 'Uspešna registracija!' });

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    },
    async handleLoginUser(req, res) {
        const { email, password } = req.body;
        try {
            let user = await userService.loginUser(email, password);
            res.status(200).json({
                message: 'Uspješna prijava!',
                token: user.token,
                user
            })
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: error.message || 'Pogrešni podaci.' });
        }
    },
    async handleAuthUser(req, res) {
        console.log(req.user);
        if (!req.user) {
            res.status(401).json({ message: 'Korisnik nije pronađen!' });
            return;
        }


        res.status(200).json(req.user);
    },
    async handleProfilData(req, res) {
        console.log("user req", req.user);
        try {

            const userData = await userService.getProfileData(req.user.userId);
            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
}