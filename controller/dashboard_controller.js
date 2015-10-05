var socket = require('../bin/www');
var models = require('../models/models.js');

exports.index = function (req, res, next) {
    console.log(socket.io);
    /// Socket ///

    socket.io.on('connection', function (socket) {
        console.log('Conectado!!!');
    });

    /// Socket ///

    res.render('index', { title: 'Overview', pretty: true });
}