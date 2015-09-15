var express = require('express');
var router = express.Router();

var jovenesController = require('../controller/jovenes_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Jovenes
router.get('/jovenes', jovenesController.index);
router.get('/jovenes/nuevo', jovenesController.nuevo);
router.get('/jovenes/:jovenId(\\d+)/editar', jovenesController.editar);

router.get('/jovenes/borrar', jovenesController.borrar);

router.post('/jovenes/create', jovenesController.create);
router.post('/jovenes/update', jovenesController.update);

module.exports = router;
