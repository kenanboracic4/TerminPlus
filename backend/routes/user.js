var express = require('express');
var router = express.Router();
const { handleRegisterUser, handleLoginUser, handleAuthUser, handleProfilData } = require('../controllers/userController');
const { verifyToken } = require('../middlware/auth');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);
router.get('/auth', verifyToken, handleAuthUser);
router.get('/profile', verifyToken, handleProfilData);

module.exports = router;
