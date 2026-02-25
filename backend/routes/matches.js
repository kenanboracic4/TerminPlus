var express = require('express');
var router = express.Router();
const { verifyToken } = require('../middlware/auth');
const matchController = require('../controllers/matchController');


router.get('/', function(req, res, next) {
  res.send('Ovdje će biti lista termina');
});


router.get('/all', matchController.getAllMatches);
router.post('/new', verifyToken, matchController.handleAddMatch);
router.get('/sports', matchController.getAllSports);

module.exports = router;