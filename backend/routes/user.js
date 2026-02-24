var express = require('express');
var router = express.Router();
const {handleRegisterUser, handleLoginUser, handleAuthUser } = require('../controllers/userController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);
router.get('/auth', handleAuthUser);

module.exports = router;
