var models = require('../models/models.js');

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
    var jovenes = models.Jovenes.build({
        nombres: req.body.joven.nombres,
        apellidos: req.body.joven.apellidos,
        grupoId: req.body.joven.grupo
    });

    jovenes
    .validate()
    .then(
        function (err) {
            if (err) {
                models.Regiones.findAll().then(function (regiones) {
                    res.render('jovenes/joven', {
                        title: 'Nuevo Jóven',
                        joven: req.body.joven,
                        regiones: regiones,
                        errors: err.errors
                    });
                });
            } else {
                jovenes
                .save()
                .then(function (){
                    res.redirect('/jovenes');
                });
            }
        }
    ).catch(
        function () {
            models.Regiones.findAll().then(function (regiones) {
                res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: req.body.joven, errors: err.errors });
            });
        }
    );
}

exports.update = function (req, res) {
    var jovenId = req.params.jovenId;

    models.Jovenes.find(jovenId)
    .then(function (joven) {
        if (joven) {
            joven.updateAttributes({
                nombres: req.body.joven.nombres,
                apellidos: req.body.joven.apellidos,
                grupoId: req.body.joven.grupo
            }).then(function (){
                res.redirect('/jovenes');
            });
        }
    });
}