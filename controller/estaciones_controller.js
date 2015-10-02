var models = require('../models/models.js');

exports.index = function (req, res) {
    var salida =  req.query.salida;

    models.Estaciones.findAll().then(function (estaciones) {
        if(salida == 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.send(estaciones);
        } else {
            res.render('estaciones/index', { title: 'Estaciones', estaciones: estaciones });
        }
    });
};

exports.new =  function(req, res) {
    var estacion = {
        id: false,
        nombre: '',
        maximo: 0,
        tipo: false
    }
    res.render('estaciones/estacion', { title: 'Nueva Estaciones', estacion: estacion });
};

exports.edit =  function(req, res) {
    var estacionId = req.params.estacionId;

    models.Estaciones.findById(estacionId)
    .then(function (estacion) {
        res.render('estaciones/estacion', { title: 'Editar Estaciones', estacion: estacion });
    });
};

exports.delete =  function(req, res) {
    var estacionId = req.params.estacionId;

    models.Estaciones.findById(estacionId)
    .then(function (estacion) {
        estacion.destroy()
        .then(function (){
            res.redirect('/estaciones');
        });
    });
};

exports.create = function (req, res) {
    var estacion = {
        nombre: req.body.estacion.nombre,
        maximo: Number(req.body.estacion.maximo),
        tipo: Boolean(req.body.estacion.tipo)
    };

    var estaciones = models.Estaciones.build(estacion);

    estaciones
    .validate()
    .then(
        function (err) {
            if (err) {
                res.render('estaciones/estacion', { title: 'Nueva Estaciones', estacion: estacion, errors: err.errors });
            } else {
                estaciones
                .save()
                .then(function (){
                    res.redirect('/estaciones');
                });
            }
        }
    ).catch(
        function (err) {
            res.render('estaciones/estacion', { title: 'Nueva Estaciones', estacion: estacion, errors: err.errors });
        }
    );
};

exports.update = function(req, res) {
    var estacionId = req.body.estacion.id;
    console.log(req.body.estacion.tipo);
    console.log(Number(req.body.estacion.tipo));

    models.Estaciones.findById(estacionId)
    .then(function (estacion) {
        if (estacion) {
            estacion.updateAttributes({
                nombre: req.body.estacion.nombre,
                maximo: Number(req.body.estacion.maximo),
                tipo: Number(req.body.estacion.tipo)
            }).then(function (){
                res.redirect('/estaciones');
            });
        }
    });
};
