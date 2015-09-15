var express = require('express');
var router = express.Router();

var regionesController = require('../controller/regiones_controller');

router.get('/', regionesController.index);
router.get('/nuevo', regionesController.nuevo);
router.get('/editar', regionesController.editar);
router.get('/borrar', regionesController.borrar);

router.post('/create', regionesController.create);
router.post('/update', regionesController.update);


router.get('/:regionId(\\d+)/distritos', regionesController.get);

module.exports = router;