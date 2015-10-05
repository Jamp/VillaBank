var socket = io();
var placeholder1 = $("#placeholder1");
var placeholder2 = $("#placeholder2");
var placeholder3 = $("#placeholder3");

var data = [],
series = 2;

for (var i = 0; i < series; i++) {
    data[i] = {
        label: "Series" + (i + 1),
        data: Math.floor(Math.random() * 100) + 1
    }
}


// Azul #1ca8dd
// Verde #1bc98e


$("#title").text("Donut Hole");
$("#description").text("A donut hole can be added.");

$.plot(placeholder1, data, {
    series: {
        pie: {
            innerRadius: .6,
            show: true,
            fill: .75
        }
    },
    colors: ["#1ca8dd", "#1bc98e"]
});

$.plot(placeholder2, data, {
    series: {
        pie: {
            innerRadius: 0.5,
            show: true
        }
    }
});

$.plot(placeholder3, data, {
    series: {
        pie: {
            innerRadius: 0.5,
            show: true
        }
    }
});