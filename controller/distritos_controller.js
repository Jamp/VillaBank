var models = require('../models/models.js');

exports.index = function (req, res) {
    res.render('jovenes/index', { title: 'Jóvenes' });
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
