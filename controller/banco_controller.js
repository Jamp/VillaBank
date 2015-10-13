var models = require('../models/models.js');
var ws = require('../bin/www');
var pagar = 20;
var cobrar = 30;

function movimientoMonetario(monto) {
    var insert = {
            coin: monto
        };

        var banco = models.Banco.build(insert);
        banco
        .validate()
        .then(
            function (err) {
                if (!err) {
                    banco
                    .save()
                    .then(function () {
                        console.log('Insertando coin');
                    });
                }
            }
        )
}

exports.operacion = function (req, res) {
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
                    movimientoMonetario(monto);
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


exports.cliente = function (req, res) {
    var salida =  req.query.salida,
        estacion = req.query.estacion;

    if (salida == 'json') {
        var options = {
            where: {
                id: req.params.jovenId
            },
            include: [
                {
                    model: models.Grupos,
                    include: [
                        {
                            model: models.Distritos,
                            include: [
                                models.Regiones
                            ]
                        }
                    ]
                }
            ]
        }

        models.Jovenes.find(options)
        .then(function (joven){
                var datos = {
                    id: joven.id,
                    nombres: joven.nombres,
                    apellidos: joven.apellidos,
                    sexo: joven.sexo,
                    region: joven.grupo.distrito.region.nombre,
                    distrito: joven.grupo.distrito.nombre,
                    grupo: joven.grupo.nombre,
                    saldo: joven.saldo
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(datos);
            });
    } else {
        // HTTP status 404: NotFound
        res.status(404).send('Not found');
    }
};
