var models = require('../models/models.js');

exports.index = function (req, res) {
    res.render('jovenes/index', { title: 'Jóvenes' });
};

exports.get = function (req, res) {
    var options = {
        regionId: req.regionId
    };

    models.Distritos.findAll(options).then(function (distritos) {
        res.setHeader('Content-Type', 'application/json');
        res.send(distritos);
    });
};
