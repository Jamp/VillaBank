var express = require('express');
var router = express.Router();

var distritosController = require('../controller/distritos_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:distritoId(\\d+)/grupos', distritosController.get);

module.exports = router;