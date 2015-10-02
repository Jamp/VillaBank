var express = require('express');
var router = express.Router();

var bancoController = require('../controller/banco_controller');

router.post('/operacion/:operacion', bancoController.operacion);
router.get('/cliente/:jovenId(\\d+)', bancoController.cliente);

module.exports = router;