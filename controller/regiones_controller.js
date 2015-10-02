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

exports.delete = function(req, res) {
    var regionId = req.params.regionId;

    models.Regiones.findById(regionId)
    .then(function(region){
        region.destroy()
        .then(function(){
            res.redirect('/regiones');
        });
    });
};
