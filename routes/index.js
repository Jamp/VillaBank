var express = require('express');
var router = express.Router();

var dashboardController = require('../controller/dashboard_controller');

router.get('/', dashboardController.index);

module.exports = router;
