var ws = require('../bin/www');
var models = require('../models/models.js');

exports.index = function (req, res, next) {

    /// Socket ///

    ws.io.on('connection', function (socket) {
        var total = 16;
        var menor = 0;
        var bucle = setInterval(function (){
            var data = [total, menor];
            ws.io.sockets.emit('recibiendoData', data);
            if (total == 0){
                clearInterval(bucle);
            } else{
                total--;
                menor++;
            }
        }, 2000);

        models.Estaciones.findAll()
        .then(function (estaciones) {
            ws.io.sockets.emit('recibiendoEstaciones', estaciones);
        });
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