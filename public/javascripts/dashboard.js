
$(function () {
    var socket = io();
    var conectado = undefined;

    socket.on('connect', function (){
        $('#status').html(' (Conectado)');
        conectado = true;
    });

    socket.on('disconnect', function (){
        $('#status').html(' (Desconectado)');
        conectado = false;
    });

    $('#status').click(function(){
        if (!conectado) {
            socket.connect();
        }
    });

    socket.on('nuevoJovenes', function (data) {
        $('#nJovenes').html(data);
    });

    var data = [
        {
            value: 13,
            color: "#1bc98e",
            label: "Estaciones vacías"
        },
        {
            value: 3,
            color: "#1ca8dd",
            label: "Estaciones Gente"
        }
    ];

    var chart = document.getElementById('placeholder1').getContext("2d");
    var jj = new Chart(chart).Doughnut(data, {responsive : true, segmentShowStroke : true, segmentStrokeColor : "#252830"});

    socket.on('recibiendoData', function (data){

        // FIXME Evitar que los redraw del canavas afecten el resultado final
        /*document.getElementById('chart').innerHTML = '<canvas id="placeholder1" width="195" height="195"></canvas>';

        var chart = document.getElementById('placeholder1').getContext("2d");
        new Chart(chart).Doughnut(data, {responsive : true, animation: false});*/

        jj.segments[1].value = data;
        jj.update();

    });

});

// Azul #1ca8dd
// Verde #1bc98e