var models = require('../models/models.js');

exports.get = function (req, res) {
    var options = {
        regionId: req.regionId
    };

    models.Distritos.findAll(options).then(function (distritos) {
        res.setHeader('Content-Type', 'application/json');
        res.send(distritos);
    });
};

exports.index =  function (req, res) {
    models.Regiones.findAll()
    .then(function (regiones){
        res.render('regiones/index', { title: 'Regiones', regiones: regiones });
    });
};


exports.new = function (req, res) {
    var region = {
        id: false,
        nombre: ''
    };
    res.render('regiones/region', { title: 'Nueva Región', region: region });
};

exports.edit = function (req, res) {
    var regionId = req.params.regionId;

    models.Regiones.findById(regionId)
    .then(function(region){
        res.render('regiones/region', { title: 'Editar Región', region: region });
    });
};

exports.delete = function (req, res) {
    var regionId = req.params.regionId;

    models.Regiones.findById(regionId)
    .then(function(region){
        region.destroy()
        .then(function(){
            res.redirect('/regiones');
        });
    });
};


exports.create = function (req, res) {
    var region = { nombre: req.body.region.nombre };

    var regiones = models.Regiones.build(region);

    regiones
    .validate()
    .then(
        function (err) {
            if (err) {
                res.render('regiones/region', { title: 'Nueva Región', region: region, errors: err.errors });
            } else {
                regiones
                .save()
                .then(function () {
                    res.redirect('/regiones');
                });
            }
    }).catch(
        function (err) {
            res.render('regiones/region', { title: 'Nueva Región', region: region, errors: err.errors });
        }
    );
};

exports.update = function (req, res) {
    var regionId = req.body.region.id;

    models.Regiones.findById(regionId)
    .then(
        function (region) {
            if (region) {
                region.updateAttributes({
                    id: regionId,
                    nombre: req.body.region.nombre
                }).then(function () {
                    res.redirect('/regiones');
                });
            }
        }
    );
};
