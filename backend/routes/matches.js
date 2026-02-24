var express = require('express');
var router = express.Router();

const matchController = require('../controllers/matchController');
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', matchController.handleAddMatch);

module.exports = router;
