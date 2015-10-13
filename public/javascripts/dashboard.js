
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

    socket.on('nuevoJoven', function (data) {
        $('#nJovenes').html(data);
    });

    socket.on('nuevoEstacion', function (data) {
        $('#nEstaciones').html(data);
    });

    socket.on('recibiendoEstaciones', function (data) {
        console.log(data);
        var tbody = $('table > tbody');
        var datos = '';
        $.each(data, function (i, v){
            datos += '<tr>';
            datos += '<td>'+v.nombre+'</td>';
            datos += '<td class="center">'+v.maximo+'</td>';
            datos += '</tr>';
        });
        tbody.empty().html(datos);
    });

    var inicial = [
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
    grafica = new Chart(chart).Doughnut(inicial, {responsive : true, segmentShowStroke : true, segmentStrokeColor : "#252830"});
    //grafica.options.animation = false;

    socket.on('recibiendoData', function (data){
        // FIXME Evitar que los redraw del canavas afecten el resultado final
        /*document.getElementById('chart').innerHTML = '<canvas id="placeholder1" width="195" height="195"></canvas>';

        var chart = document.getElementById('placeholder1').getContext("2d");
        new Chart(chart).Doughnut(inicial, {responsive : true, animation: false});*/

        grafica.segments[0].value = data[0];
        grafica.segments[1].value = data[1];
        grafica.update();

    });

});

// Azul #1ca8dd
// Verde #1bc98e