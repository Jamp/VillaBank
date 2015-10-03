var express = require('express');
var router = express.Router();

var regionesController = require('../controller/regiones_controller');

router.get('/', regionesController.index);
router.get('/nuevo', regionesController.new);
router.get('/:regionId(\\d+)/editar', regionesController.edit);
router.get('/:regionId(\\d+)/borrar', regionesController.delete);

router.post('/create', regionesController.create);
router.post('/update', regionesController.update);


router.get('/:regionId(\\d+)/distritos', regionesController.get);

module.exports = router;