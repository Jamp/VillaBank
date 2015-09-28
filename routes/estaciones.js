var express = require('express');
var router = express.Router();

var estacionesController = require('../controller/estaciones_controller');

router.get('/', estacionesController.index);

module.exports = router;