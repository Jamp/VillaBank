var models = require('../models/models.js');

exports.index = function (req, res) {
    res.render('jovenes/index', { title: 'Jóvenes' });
};

exports.nuevo = function (req, res) {
    var options = {};
    var joven = {
        id: '',
        nombres: '',
        apellidos: '',
        region: '',
        distrito: '',
        grupo: ''
    }

    options.where = {DistritoId: 1};

    var grupo =
    models.Grupos.findAll(options).then(function(grupos){
        console.log(grupos);
        res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: joven, grupos: grupos });
    });
};

exports.editar = function (req, res) {
    var joven = {
        id: null,
        nombres: 'Jaro',
        apellidos: 'Marval',
        region: 1,
        distrito: 1,
        grupo: 1
    }
    res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: joven });
};

exports.borrar = function (req, res) {
    res.redirect('/jovenes');
};

exports.create = function (req, res) {
    var jovenes = models.Jovenes.build({
        nombres: req.body.joven.nombres,
        apellidos: req.body.joven.apellidos,
        GruposId: req.body.joven.grupo
    });

    jovenes
    .validate()
    .then(
        function (err) {
            if (err) {
                res.render('jovenes/joven', { title: 'Nuevo Jóven', joven: req.body.joven, errors: err.errors });
            } else {
                jovenes
                .save()
                .then(function (){
                    res.redirect('/jovenes');
                });
            }
        }
    );
}

exports.update = function (req, res) {
    res.redirect('/jovenes');
}