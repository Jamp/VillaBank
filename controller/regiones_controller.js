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
