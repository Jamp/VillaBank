var models = require('../models/models.js');

exports.index = function (req, res) {
    var salida =  req.query.salida;
    console.log("Salida "+salida)

    models.Estaciones.findAll().then(function (estaciones) {
        if(salida == 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.send(estaciones);
        } else {
            res.render('estaciones/index', { title: 'Estaciones', estaciones: estaciones });
        }
    });
};