var UrlGetSocios = 'http://localhost:80/G8_19/SociosNegocio/controller/socios.php?op=GetSocios';
var UrlPostSocios = 'http://localhost:80/G8_19/SociosNegocio/controller/socios.php?op=InsertSocio';
var UrlGetUno = 'http://localhost:80/G8_19/SociosNegocio/controller/socios.php?op=GetUno';
var UrlPutSocios = 'http://localhost:80/G8_19/SociosNegocio/controller/socios.php?op=UpdateUno';
var UrlDeleteSocios = 'http://localhost:80/G8_19/SociosNegocio/controller/socios.php?op=DeleteUno';


$(document).ready(function () {
    CargarSocios();
});

//FUNCIONA BIEN
function CargarSocios() {
    $.ajax({
        url: UrlGetSocios,
        type: 'GET', //segun el metodo cambi aPOST
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';
            //ciclo for que lee la respuesta de se obtiene de la url
            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].NOMBRE + '</td>' +
                    '<td>' + MiItems[i].RAZON_SOCIAL + '</td>' +
                    '<td>' + MiItems[i].DIRECCION + '</td>' +
                    '<td>' + MiItems[i].TIPO_SOCIO + '</td>' +
                    '<td>' + MiItems[i].CONTACTO + '</td>' +
                    '<td>' + MiItems[i].EMAIL + '</td>' +
                    '<td>' + MiItems[i].FECHA_CREADO + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + MiItems[i].TELEFONO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-warning" onclick="CargarSocio(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-danger" onclick="EliminarSocio(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('.socios').html(Valores); //donde voy a mostrar la respuesta que he obtenido (en la clase .socios)
            }
        }
    })
}

//FUNCIONA BIEN
function AgregarSocio() {
    var datossocio = {
        id: $('#id').val(),
        nombre: $('#nombre').val(),
        razon_social: $('#razon_social').val(),
        direccion: $('#direccion').val(),
        tipo_socio: $('#tipo_socio').val(),
        contacto: $('#contacto').val(),
        email: $('#email').val(),
        fecha_creado: $('#fecha_creado').val(),
        estado: $('#estado').val(),
        telefono: $('#telefono').val()
    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlPostSocios,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert('Socio Agregado');
}


function CargarSocio(idsocio) {

    var datossocio = {
        id: idsocio
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#id').val(MiItems[0].ID);
            $('#nombre').val(MiItems[0].NOMBRE);
            $('#razon_social').val(MiItems[0].RAZON_SOCIAL);
            $('#direccion').val(MiItems[0].DIRECCION);
            $('#tipo_socio').val(MiItems[0].TIPO_SOCIO);
            $('#contacto').val(MiItems[0].CONTACTO);
            $('#email').val(MiItems[0].EMAIL);
            $('#fecha_creado').val(MiItems[0].FECHA_CREADO);
            $('#estado').val(MiItems[0].ESTADO);
            $('#telefono').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio(' + MiItems[0].ID + ')" value="Actualizar Socio" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);

        }
    });

}

function ActualizarSocio(idsocio) {

    var datossocio = {
        id: idsocio,
        //ID: $('#id').val(),
        nombre: $('#nombre').val(),
        razon_social: $('#razon_social').val(),
        direccion: $('#direccion').val(),
        tipo_socio: $('#tipo_socio').val(),
        contacto: $('#contacto').val(),
        email: $('#email').val(),
        fecha_creado: $('#fecha_creado').val(),
        estado: $('#estado').val(),
        telefono: $('#telefono').val()
    };
    
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlPutSocios,
        type: 'PUT',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Actualizado");
    
}


//FUNCIONA BIEN
function EliminarSocio(idsocio) {
    var datossocio = {
        id: idsocio
    };
    var datossociojson = JSON.stringify(datossocio)

    $.ajax({
        url: UrlDeleteSocios,
        type: 'DELETE',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response)
        }
    });
    alert("Socio Eliminado");
}