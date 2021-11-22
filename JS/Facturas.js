var UrlGetFacturas = "http://127.0.0.1:80/G8_19/Facturas/controlador/facturas.php?op=GetFACTURAS";
var UrlPostFacturas = "http://127.0.0.1:80/G8_19/Facturas/controlador/facturas.php?op=insertFactura";
var UrlGetUno = "http://127.0.0.1:80/G8_19/Facturas/controlador/facturas.php?op=GetUno";
var UrlPutFacturas = "http://127.0.0.1:80/G8_19/Facturas/controlador/facturas.php?op=Actualizarfactura";
var UrlDeleteFacturas = "http://127.0.0.1:80/G8_19/Facturas/controlador/facturas.php?op=EliminarFacturas";

$(document).ready(function(){
    cargarfacturas();
});

function Cargarfacturas(){
    $.ajax({
        url:urlGetfacturas,
        type: 'GET',
        Datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var valores = '';

            for(i = 0; i < MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="Cargarfacturas('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarFacturas('+MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
            $('.facturas').html(valores);
            }
            
        }

    });
}

function AgregarFactura(){
    var datosfactura = {
        ID: $('#ID').val(),
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPostFacturas,
        type:'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Agregada");
}

function Cargarfacturas(idfactura){
    var datosfactura = {
        ID: idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#ESTADO').val(MiItems[0].ESTADO);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="Actualizarfactura(' + MiItems[0].ID + ')"' +
                'value="Actualizar factura" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
            
        }

    });
}

function Actualizarfactura(idfactura){
    var datosfactura = {
        ID: idfactura,
        ID: $('#ID').val(),
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPutFacturas,
        type:'PUT',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Actualizada");
}

function EliminarFacturas(idfactura) {
    var datosfactura = {
        ID: idfactura
    };

    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlDeleteFacturas,
        type: 'DELETE',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Eliminada");
}
