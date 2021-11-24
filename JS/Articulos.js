var urlGetArticulos = 'http://34.68.196.220:90/G8_19/Articulos/controller/articulos.php?op=GetArticulos';

var urlPostArticulo = 'http://34.68.196.220:90/G8_19/Articulos/controller/articulos.php?op=InsertArticulos';//insetar

var urlPutArticulos = 'http://34.68.196.220:90/G8_19/Articulos/controller/articulos.php?op=Update';
var urlDeleteArticulos = 'http://34.68.196.220:90/G8_19/Articulos/controller/articulos.php?op=Delete';
var urlGetUno = 'http://34.68.196.220:90/G8_19/Articulos/controller/articulos.php?op=GetArticuloID'; 
//NOTA: Siempre que vaya a probar el api rest abrir el xampp
$(document).ready(function () {

    CargarArticulos();


});
function CargarArticulos() {//funciona

    $.ajax({
        url: urlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = ''; //deposito los valores de response

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr class="table-dark">' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].DESCRIPCION + '</td>' +
                    '<td>' + MiItems[i].UNIDAD + '</td>' +
                    '<td>' + MiItems[i].COSTO + '</td>' +
                    '<td>' + MiItems[i].PRECIO + '</td>' +
                    '<td>' + MiItems[i].APLICA_ISV + '</td>' +
                    '<td>' + MiItems[i].PORCENTAJE_ISV + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td >' +
                    '<Button class="btn btn-outline-warning" onclick="Cargar(' + MiItems[i].ID + ')">Editar</Button>' +
                    '</td>' +
                    '<td >' +
                    '<Button class="btn btn-outline-danger" onclick="EliminarArticulo(' + MiItems[i].ID + ')">Eliminar</Button>' +
                    '</td>' +
                    '</tr>';
                $('.articulos').html(Valores);

            };
        }

    });

}
function AgregarArticulo() {//funciona
    var datosArticulos = {
        ID: $('#id').val(),
        DESCRIPCION: $('#descripcion').val(),
        UNIDAD: $('#unidad').val(),
        COSTO: $('#costo').val(),
        PRECIO: $('#precio').val(),
        APLICA_ISV: $('#aplica_isv').val(),
        PORCENTAJE_ISV: $('#porcentaje_isv').val(),
        ESTADO: $('#estado').val(),
        ID_SOCIO: $('#id_socio').val() 
    };
    var datosArticulosjson = JSON.stringify(datosArticulos);

    $.ajax({
        url: urlPostArticulo,
        type: 'PUT',
        data: datosArticulosjson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function (response) {
            console.log(response);

        }
    });
    alert("Agregado con éxito");

}
function Cargar(id) {//FUNCIONA
    var datosArticulos = {
        id: id
    };
    var datosArticulosjson = JSON.stringify(datosArticulos);
 
        $.ajax({
            url: urlGetUno,
            type: 'POST',
            data: datosArticulosjson,
            datatype: 'JSON',
            contenType: 'application/json',
            success: function (response) {
                var MiItems = response;
                $('#id').val(MiItems[0].ID);
                $('#descripcion').val(MiItems[0].DESCRIPCION);
                $('#unidad').val(MiItems[0].UNIDAD);
                $('#costo').val(MiItems[0].COSTO);
                $('#precio').val(MiItems[0].PRECIO);
                $('#aplica_isv').val(MiItems[0].APLICA_ISV);
                $('#porcentaje_isv').val(MiItems[0].PORCENTAJE_ISV);
                $('#estado').val(MiItems[0].ESTADO);
                $('#id_socio').val(MiItems[0].ID_SOCIO);
                var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="UpdateArticulos(' + MiItems[0].ID + ')"' +
                    'value="Actualizar Articulo" class="btn btn-warning"></input>';
                $('.button').html(btnactualizar);
            }
        });  
}
function UpdateArticulos(Id) {//funciona
    var datosArticulos = {
        ID: Id,
        DESCRIPCION: $('#descripcion').val(),
        UNIDAD: $('#unidad').val(),
        COSTO: $('#costo').val(),
        PRECIO: $('#precio').val(),
        APLICA_ISV: $('#aplica_isv').val(),
        PORCENTAJE_ISV: $('#porcentaje_isv').val(),
        ESTADO: $('#estado').val(),
        ID_SOCIO: $('#id_socio').val()
    };
    var datosArticulosjson = JSON.stringify(datosArticulos);

    $.ajax({
        url: urlPutArticulos,
        type: 'PUT',
        data: datosArticulosjson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function (response) {
            console.log(response);

        }
    });
    alert("Actualizado con éxito");
}
function EliminarArticulo(id) {// FUNCIONA
    var datosArticulos = {
        id: id
    };
    var datosArticulosjson = JSON.stringify(datosArticulos);
    $.ajax({
        url: urlDeleteArticulos,
        type: 'DELETE',
        data: datosArticulosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Id: " + id + ", borrado con éxito");
}
//----------------------------------------------FIN---------------------------------------------------//