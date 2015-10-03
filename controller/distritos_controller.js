var models = require('../models/models.js');

exports.index = function (req, res) {
    var options = {
        include: [
            models.Regiones
        ]
    };

    models.Distritos.findAll(options)
    .then(function (distritos){
        res.render('distritos/index', { title: 'Distrito', distritos: distritos });
    });
};

exports.new = function (req, res) {
    var distrito = {
        id: false,
        region: null,
        nombre: ''
    }
    models.Regiones.findAll()
    .then(function (regiones) {
        res.render('distritos/distrito', { title: 'Nuevo Distrito', distrito: distrito, regiones: regiones });
    });
};

exports.edit = function (req, res) {
    var options = {
        where: {
            id: req.params.distritoId
        },
        include: [
            models.Regiones
        ]
    };

    models.Regiones.findAll()
    .then(function (regiones) {
        models.Distritos.find(options)
        .then(function (distrito){
            var datos = {
                id: distrito.id,
                region: distrito.region.id,
                nombre: distrito.nombre
            };
            res.render('distritos/distrito', { title: 'Editar Distrito', distrito: datos, regiones: regiones });
        });
    });
};

exports.create = function (req, res) {
    var distrito = {
        nombre: req.body.distrito.nombre,
        regionId: req.body.distrito.region
    };

    var distritos = models.Distritos.build(distrito);

    distritos
    .validate()
    .then(
        function (err) {
            if (err) {
                models.Regiones.findAll()
                .then(function (regiones) {
                    res.render('distritos/distrito', { title: 'Nuevo Distrito', distrito: distrito, regiones: regiones, err: err.errors });
                });
            } else {
                distritos
                .save()
                .then(function () {
                    res.redirect('/distritos');
                });
            }
        }
    );
};

exports.update = function (req, res) {
    var distritoId = req.params.distrito.id;

    models.Distritos.findById(distritoId)
    .then(function (distrito) {
        if (distrito) {
            distrito.updateAttributes({
                region: req.body.distrito.region,
                nombre: req.body.distrito.nombre
            }).then(function () {
                res.redirect('/distritos');
            });
        }
    });
};

exports.delete = function (req, res) {
    var distritoId = req.body.distrito.id;

    models.Distritos.findById(distritoId)
    .then(function (distrito) {
        distrito.destroy()
        .then(function () {
            res.redirect('/distritos');
        });
    });
};

exports.get = function (req, res) {
    var options = {
        where:
            {
                distritoId: req.params.distritoId
            }
    };

    models.Grupos.findAll(options).then(function (grupos) {
        res.setHeader('Content-Type', 'application/json');
        res.send(grupos);
    });
};
