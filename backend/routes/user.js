var express = require('express');
var router = express.Router();
const {handleRegisterUser} = require('../controllers/userController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', handleRegisterUser);

module.exports = router;
