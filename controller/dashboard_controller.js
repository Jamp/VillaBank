var ws = require('../bin/www');
var models = require('../models/models.js');

exports.index = function (req, res, next) {

    /// Socket ///

    ws.io.on('connection', function (socket) {
        console.log('Conectado!!!');
    });

    /// Socket ///

    models.Jovenes.count()
    .then(function (jovenes) {

        models.Estaciones.count()
        .then(function (estaciones){
            res.render('index', { title: 'Overview', nJovenes: jovenes, nEstaciones: estaciones });
        });

    });
}