var models = require('../models/models');

exports.index = function (req, res) {
    var options = {
        include: [
            {
                model: models.Distritos,
                include: [
                    models.Regiones
                ]
            }
        ]
    }

    models.Grupos.findAll(options)
    .then(function (grupos){
        res.render('grupos/index', { title: 'Grupos', grupos: grupos });
    });
};


exports.new = function (req, res) {
    var grupo = {
        nombre: '',
        distrito: '',
        region: ''
    };

    models.Regiones.findAll()
    .then(function (regiones) {
        res.render('grupos/grupo', { title: 'Nuevo Grupo', regiones: regiones, grupo: grupo });
    });
};

exports.edit = function (req, res) {
    var options = {
        where: {
            id: req.params.grupoId
        },
        include: [
            {
                model: models.Distritos,
                include: [
                    models.Regiones
                ]
            }
        ]
    }

    models.Regiones.findAll()
    .then(function (regiones) {
        models.Grupos.find(options)
        .then(function (grupo){
            var datos = {
                id: grupo.id,
                nombre: grupo.nombre,
                distrito: grupo.distrito.id,
                region: grupo.distrito.region.id
            };
            res.render('grupos/grupo', { title: 'Grupos', regiones: regiones, grupo: datos });
        });
    });
};

exports.create = function (req, res) {
    var grupo = {
        nombre: req.body.grupo.nombre,
        distritoId: req.body.grupo.distrito
    };

    var grupos = models.Grupos.build(grupo);

    grupos
    .validate()
    .then(
        function (err) {
            if (err) {
                models.Regiones.findAll().then(function (regiones) {
                    res.render('grupos/grupo', {
                        title: 'Nuevo Grupo',
                        grupo: grupo,
                        regiones: regiones,
                        errors: err.errors
                    });
                });
            } else {
                grupos
                .save()
                .then(function (){
                    res.redirect('/grupos');
                });
            }
        }
    ).catch(
        function () {
            models.Regiones.findAll().then(function (regiones) {
                res.render('grupos/grupo', { title: 'Nuevo Grupo', grupo: grupo, errors: err.errors });
            });
        }
    );
};

exports.update = function (req, res) {
    var grupoId = req.body.grupo.id;

    models.Grupos.findById(grupoId)
    .then(function (grupo) {
        if (grupo) {
            grupo.updateAttributes({
                nombre: req.body.grupo.nombre,
                distritoId: req.body.grupo.distrito
            }).then(function (){
                res.redirect('/grupos');
            });
        }
    });
};

exports.delete = function (req, res) {
    var grupoId = req.params.grupoId;

    models.Grupos.findById(grupoId)
    .then(function (grupo) {
        grupo.destroy()
        .then(function (){
            res.redirect('/grupos');
        });
    });
};
