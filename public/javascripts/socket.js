var socket = io();

var data = [];
data[0] = {
    value: Math.floor(Math.random() * 100) + 1,
    color: "#1bc98e",
    label: "Estaciones vacías"
};
data[1] = {
    value: Math.floor(Math.random() * 100) + 1,
    color: "#1ca8dd",
    label: "Estaciones Gente"
};

$(function () {
    var placeholder = document.getElementById('placeholder1').getContext("2d");
    new Chart(placeholder).Doughnut(data, {responsive : true});
})

/* {
    value: 300,
    color:"#F7464A",
    highlight: "#FF5A5E",
    label: "Red"
},
{
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green"
}, */

// Azul #1ca8dd
// Verde #1bc98e