var express = require('express');
var router = express.Router();

var bancoController = require('../controller/banco_controller');

router.get('/:operacion', bancoController.index);

module.exports = router;