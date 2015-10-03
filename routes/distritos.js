var express = require('express');
var router = express.Router();

var distritosController = require('../controller/distritos_controller');

router.get('/', distritosController.index);
router.get('/nuevo', distritosController.new);
router.get('/:distritoId(\\d+)/editar', distritosController.edit);
router.get('/:distritoId(\\d+)/borrar', distritosController.delete);

router.post('/create', distritosController.create);
router.post('/update', distritosController.update);

router.get('/:distritoId(\\d+)/grupos', distritosController.get);

module.exports = router;