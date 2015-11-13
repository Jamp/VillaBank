var models = require('../models/models.js');
var ws = require('../bin/www');

function nuevoJoven() {
    models.Jovenes.count()
    .then(function (numero){
        ws.io.sockets.emit('nuevoJoven', numero);
    });
}

exports.index = function (req, res) {
    var options = {
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

    models.Jovenes.findAll(options)
    .then(function (jovenes){
        res.render('jovenes/index', { title: 'Jóvenes', jovenes: jovenes });
    });
};

exports.nuevo = function (req, res) {
    var options = {};
    var joven = {
        id: false,
        nombres: '',
        apellidos: '',
        sexo: '',
        region: '',
        distrito: '',
        grupo: ''
    }

    models.Regiones.findAll().then(function (regiones) {
        res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: joven, regiones: regiones });
    });
};

exports.editar = function (req, res) {
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

    models.Regiones.findAll()
    .then(function (regiones){
        models.Jovenes.find(options)
        .then(function (joven){
            var datos = {
                id: joven.id,
                nombres: joven.nombres,
                apellidos: joven.apellidos,
                sexo: joven.sexo,
                region: joven.grupo.distrito.region.id,
                distrito: joven.grupo.distrito.id,
                grupo: joven.grupo.id
            }
            res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: datos, regiones:regiones });
        });
    })
};

exports.borrar = function (req, res) {
    var jovenId = req.params.jovenId;

    models.Jovenes.findById(jovenId)
    .then(function (joven) {
        joven.destroy()
        .then(function (){
            res.redirect('/jovenes');
        });
    });
};

exports.create = function (req, res) {
    var joven = {
        nombres: req.body.joven.nombres,
        apellidos: req.body.joven.apellidos,
        sexo: Number(req.body.joven.sexo),
        grupoId: req.body.joven.grupo
    };

    var jovenes = models.Jovenes.build(joven);

    jovenes
    .validate()
    .then(
        function (err) {
            if (err) {
                models.Regiones.findAll().then(function (regiones) {
                    res.render('jovenes/joven', {
                        title: 'Nuevo Jóven',
                        joven: joven,
                        regiones: regiones,
                        errors: err.errors
                    });
                });
            } else {
                jovenes
                .save()
                .then(function (){
                    nuevoJoven();
                    res.redirect('/jovenes');
                });
            }
        }
    ).catch(
        function () {
            models.Regiones.findAll().then(function (regiones) {
                res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: joven, errors: err.errors });
            });
        }
    );
};

exports.update = function (req, res) {
    var jovenId = req.body.joven.id;

    models.Jovenes.findById(jovenId)
    .then(function (joven) {
        if (joven) {
            joven.updateAttributes({
                nombres: req.body.joven.nombres,
                apellidos: req.body.joven.apellidos,
                sexo: Number(req.body.joven.sexo),
                grupoId: req.body.joven.grupo
            }).then(function (){
                res.redirect('/jovenes');
            });
        }
    });
};

exports.multipass = function (req, res) {
    var jovenId = req.params.jovenId;

    models.Jovenes.findById(jovenId)
    .then(function (joven) {
        qr = require('qr-image').image(joven.id, { type: 'png', ec_level: 'H', size: 5, margin: 0 });
        res.type('png');
        qr.pipe(res);
    });
};

exports.view = function (req, res) {
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
            grupo: joven.grupo.nombre
        }
        res.render('jovenes/ver', { title: 'Ver Jóven', joven: datos });
    });
};

exports.lot = function (req, res) {

    var options = {
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

    models.Jovenes.findAll(options)
    .then(function (jovenes){
        res.render('jovenes/lote', { title: 'Impresión por Lote', jovenes: jovenes });
    });
};