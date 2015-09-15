
function regionLoad(region, id) {
   var cmbDistritos = $('#distrito');

   cmbDistritos.empty();
   cmbDistritos.append('<option> Cargando... </option>');

   $.getJSON(
        '/regiones/' + region + '/distritos',
        function (data) {
            cmbDistritos.empty();
            cmbDistritos.append('<option>-- Seleccione --</option>');
            $(data).each(function (i, v){
                var selected = 'selected="selected"';
                if (id != v.id) {
                    selected = '';
                }
                var option = '<option value="' + v.id + '"' + selected + '>' + v.nombre + '</option>';
                cmbDistritos.append(option);
            });
        }
    );
}

function distritoLoad(distrito, id) {
    var cmbGrupos = $('#grupo');

   cmbGrupos.empty();
   cmbGrupos.append('<option> Cargando... </option>');

   $.getJSON(
        '/distritos/' + distrito + '/grupos',
        function (data) {
            cmbGrupos.empty();
            cmbGrupos.append('<option>-- Seleccione --</option>');
            $(data).each(function (i, v){
                var selected = 'selected="selected"';
                if (id != v.id) {
                    selected = '';
                }
                var option = '<option value="' + v.id + '"' + selected + '>' + v.nombre + '</option>';
                cmbGrupos.append(option);
            });
        }
    );
}

$('#region').on('change', function(){
   var region = $('#region').val();

   regionLoad(region);
});

$('#distrito').on('change', function(){
   var distrito = $('#distrito').val();

    distritoLoad(distrito);
});

$(document).ready(function (){
    var region = $('#aux_region').val();
    var distrito = $('#aux_distrito').val();
    var grupo = $('#aux_grupo').val();

    if (region !== '' && grupo !== '') {
        regionLoad(region, distrito);
        distritoLoad(distrito, grupo);
    }
});
