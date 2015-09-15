var express = require('express');
var router = express.Router();

var regionesController = require('../controller/regiones_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:regionId(\\d+)/distritos', regionesController.get);

module.exports = router;