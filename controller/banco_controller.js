var models = require('../models/models.js');
var pagar = 20;
var cobrar = 30;

exports.index = function (req, res) {
    var personas = String(req.body.personas).split(',');
    var monto = -cobrar; // Cobro
    if (req.params.operacion === 'pagar') {
        monto = pagar; // Pago
    }

    var resultado = {
        resultado: true
    };
    res.setHeader('Content-Type', 'application/json');

    // FIXME: Convertir en una transacción
    for (var i = 0; i < personas.length; i++) {
        models.Jovenes.findById(personas[i])
        .then(function (joven) {
            if (joven) {
                joven.updateAttributes({
                    saldo: joven.saldo + monto
                }).then(function (){
                    if (i == personas.length) {
                        res.send(resultado);
                    }
                }).catch(function (err){
                    resultado.resultado = false;
                    res.send(resultado);
                });
            }
        }).catch(function (err){
            resultado.resultado = false;
            res.send(resultado);
        });

    };

};