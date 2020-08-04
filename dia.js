///<reference path="node_modules/@types/jquery/index.d.ts" />
function Agregar() {
    var dia = {};
    var pagina = "BACKEND/dia/agregar";
    dia.fecha = $("#dateFecha").val();
    dia.publicaciones = $("#txtPublicaciones").val();
    dia.videos = $("#txtVideos").val();
    dia.horas = $("#txtHoras").val();
    dia.revisitas = $("#txtRevisitas").val();
    dia.estudios = $("#txtEstudios").val();
    var form = new FormData();
    form.append("cadenaJson", JSON.stringify(dia));
    $.ajax({
        url: pagina,
        type: "post",
        data: form,
        dataType: "json",
        contentType: false,
        processData: false,
        async: true
    }).done(function (respuesta) {
        AlertSuccess(respuesta.mensaje);
        CargarTabla();
        ArmarAgregar();
    }).fail(function (jqxhr) {
        var respuesta = JSON.parse(jqxhr.responseText);
        AlertDanger(respuesta.mensaje);
    });
}
//Deberia verse selecionada la fila que voy a modificar
function CargarTabla() {
    var pagina = "BACKEND/dia/traerTodos";
    $.ajax({
        url: pagina,
        type: "get",
        dataType: "json",
        //contentType:false,
        //  processData:false,
        async: true
    }).done(function (respuesta) {
        if (respuesta.exito) {
            var fila_1 = 0;
            var listaDias = respuesta.listaDias;
            var totalPublicaciones_1 = 0;
            var totalVideos_1 = 0;
            var acumuladorTime = new Date();
            var totalRevisitas_1 = 0;
            var totalEstudios_1 = 0;
            var totalDias = listaDias.length;
            var aux = new Date();
            var arrayHoras_1 = Array();
            var html_1 = '<h1 >Mes Actual</h1>';
            html_1 += '<table class="table table-sm table-dark table-hover mt-3">';
            html_1 += '<tr><th></th><th>Nº</th><th>Fecha</th><th>Publicaciones</th><th>Videos</th><th>Horas</th>';
            html_1 += '<th>Revisitas</th><th>Estudios</th><th>Modificar</th><th>Eliminar</th></tr>';
            listaDias.forEach(function (element) {
                fila_1++;
                totalPublicaciones_1 += parseInt(element.publicaciones);
                totalVideos_1 += parseInt(element.videos);
                arrayHoras_1.push(element.horas);
                totalRevisitas_1 += parseInt(element.revisitas);
                totalEstudios_1 += parseInt(element.estudios);
                html_1 += '<tr"><td></td><td>' + fila_1 + '</td><td>' + element.fecha + '</td><td class="text-center">' + element.publicaciones + '</td>';
                html_1 += '<td class="text-center">' + element.videos + '</td>' + '<td>' + element.horas + '</td>';
                html_1 += '<td class="text-center">' + element.revisitas + '</td><td class="text-center">' + element.estudios + '</td>';
                html_1 += "<td><input type='button' value='Modificar' class='btn btn-warning' onclick='ArmarModificar(" + JSON.stringify(element) + "," + fila_1 + ")'></td>";
                html_1 += '<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar(' + element.id + ')"></td></tr>';
            });
            var totalHoras = CalcularTotalHoras(arrayHoras_1);
            html_1 += '<tr><td>Total:</td><td class="text-left" colspan="2">' + totalDias + ' Dias</td><td class="text-center">' + totalPublicaciones_1 + '</td>';
            html_1 += '<td class="text-center">' + totalVideos_1 + '</td><td class="text-center">' + totalHoras + '</td>';
            html_1 += '<td class="text-center">' + totalRevisitas_1 + '</td><td class="text-center">' + totalEstudios_1 + '</td></tr></table>';
            $("#tablaMes").html(html_1);
        }
    }).fail(function (jqxhr) {
        console.log(jqxhr.responseText);
    });
}
function CalcularTotalHoras(arrayHoras) {
    var aux = new Date();
    aux.setHours(0, 0);
    var horas = 0;
    var minutos = 0;
    var retorno = "00:00";
    horas = arrayHoras.map(function (element, index, array) {
        return parseInt(element.split(":")[0]);
    }).reduce(function (anterior, siguiente, index, array) {
        return anterior + siguiente;
    });
    minutos = arrayHoras.map(function (element, index, array) {
        return parseInt(element.split(":")[1]);
    }).reduce(function (anterior, siguiente, index, array) {
        return anterior + siguiente;
    });
    aux.setMinutes(minutos);
    if (aux.getMinutes().toString().length == 1) {
        retorno = horas + aux.getHours() + ":0" + aux.getMinutes();
    }
    else {
        retorno = horas + aux.getHours() + ":" + aux.getMinutes();
    }
    return retorno;
}
//Cambiar confirm por ventana Modal
function Eliminar(id) {
    var pagina = "BACKEND/dia/borrar";
    if (confirm("Desea eliminar la fila nº" + id)) {
        $.ajax({
            url: pagina,
            type: "delete",
            data: { "id": id },
            dataType: "json",
            async: true
        }).done(function (resultado) {
            CargarTabla();
            AlertSuccess(resultado.mensaje);
        }).fail(function (jqxhr) {
            var respuesta = JSON.parse(jqxhr.responseText);
            AlertDanger(respuesta.mensaje);
        });
    }
}
function Modificar(id) {
    var dia = {};
    var pagina = "BACKEND/dia/modificar";
    dia.id = id;
    dia.fecha = $("#dateFecha").val();
    dia.publicaciones = $("#txtPublicaciones").val();
    dia.videos = $("#txtVideos").val();
    dia.horas = $("#txtHoras").val();
    dia.revisitas = $("#txtRevisitas").val();
    dia.estudios = $("#txtEstudios").val();
    var json = { "cadenaJson": dia };
    $.ajax({
        url: pagina,
        type: "put",
        data: json,
        dataType: "json",
        // contentType:false,
        // processData:false,
        async: true
    }).done(function (respuesta) {
        AlertSuccess(respuesta.mensaje);
        CargarTabla();
        ArmarAgregar();
    }).fail(function (jqxhr) {
        var respuesta = JSON.parse(jqxhr.responseText);
        AlertDanger(respuesta.mensaje);
    });
}
function ArmarAgregar() {
    $("#dateFecha").val("");
    $("#txtPublicaciones").val("");
    $("#txtVideos").val("");
    $("#txtHoras").val("");
    $("#txtRevisitas").val("");
    $("#txtEstudios").val("");
    $("#btnAgregar").val("Agregar");
    $("#btnAgregar").attr("onclick", "Agregar()");
}
function ArmarModificar(elemento, fila) {
    $("#dateFecha").val(elemento.fecha);
    $("#txtPublicaciones").val(elemento.publicaciones);
    $("#txtVideos").val(elemento.videos);
    $("#txtHoras").val(elemento.horas);
    $("#txtRevisitas").val(elemento.revisitas);
    $("#txtEstudios").val(elemento.estudios);
    $("#btnAgregar").val("Modificar");
    $("#btnAgregar").attr("onclick", "Modificar(" + elemento.id + ")");
    AlertWarning("Cuidado!!! Fila nº " + fila + " seleccionada para modificar");
}
//class=alert-dissmisable
function AlertSuccess(mensaje) {
    var html = '<div class="alert alert-success">' + mensaje + '</div>';
    $("#divAlert").html(html);
}
function AlertDanger(mensaje) {
    var html = '<div class="alert alert-danger alert-dissmisable">' + mensaje + '</div>';
    $("#divAlert").html(html);
}
function AlertWarning(mensaje) {
    var html = '<div class="alert alert-warning alert-dissmisable">' + mensaje + '</div>';
    $("#divAlert").html(html);
}
