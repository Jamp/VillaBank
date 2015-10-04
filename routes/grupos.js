var express = require('express');
var router = express.Router();

var gruposController = require('../controller/grupos_controller');

router.get('/', gruposController.index);
router.get('/nuevo', gruposController.new);
router.get('/:grupoId(\\d+)/editar', gruposController.edit);
router.get('/:grupoId(\\d+)/borrar', gruposController.delete);

router.post('/create', gruposController.create);
router.post('/update', gruposController.update);

module.exports = router;