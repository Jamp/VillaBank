$('.red').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    var answer = confirm('¿Está seguro que quiere borrar este item?');
    // console.log();
    if (answer) {
        var origin = window.location.origin;
        window.location.href = origin + href;
    }
});