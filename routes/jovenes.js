var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('jovenes/index', { title: 'Jóvenes'});
});

router.get('/nuevo', function(req, res, next) {
    var joven = {
        id: null,
        nombres: 'Jaro',
        apellidos: 'Marval'
    }
  res.render('jovenes/nuevo', { title: 'Nuevo Jóven', joven: joven});
});

module.exports = router;
