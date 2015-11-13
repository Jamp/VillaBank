var express = require('express');
var router = express.Router();

var jovenesController = require('../controller/jovenes_controller');

router.get('/', jovenesController.index);
router.get('/nuevo', jovenesController.nuevo);
router.get('/:jovenId(\\d+)/editar', jovenesController.editar);

router.get('/:jovenId(\\d+)/borrar', jovenesController.borrar);

router.post('/create', jovenesController.create);
router.post('/update', jovenesController.update);

router.get('/multipass/:jovenId(\\d+)', jovenesController.multipass);
router.get('/ver/:jovenId(\\d+)', jovenesController.view);
router.get('/lote', jovenesController.lot);

module.exports = router;
