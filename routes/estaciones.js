var express = require('express');
var router = express.Router();

var estacionesController = require('../controller/estaciones_controller');

router.get('/', estacionesController.index);

router.get('/nuevo', estacionesController.new);
router.get('/:estacionId(\\d+)/editar', estacionesController.edit);
router.get('/:estacionId(\\d+)/borrar', estacionesController.delete);

router.post('/create', estacionesController.create);
router.post('/update', estacionesController.update);

module.exports = router;