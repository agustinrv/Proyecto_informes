///<reference path="node_modules/@types/jquery/index.d.ts" />
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
            var listaDias = respuesta.listaDias;
            var totalPublicaciones_1 = 0;
            var totalVideos_1 = 0;
            var totalHoras_1 = 0;
            var totalRevisitas_1 = 0;
            var totalEstudios_1 = 0;
            var totalDias = listaDias.length;
            var hora_1 = new Date();
            var html_1 = '<h1 >Mes Actual</h1>';
            html_1 += '<table class="table table-sm table-dark table-hover mt-3">';
            html_1 += '<tr><th></th><th>Nº</th><th>Fecha</th><th>Publicaciones</th><th>Videos</th><th>Horas</th>';
            html_1 += '<th>Revisitas</th><th>Estudios</th><th>Modificar</th><th>Eliminar</th></tr>';
            listaDias.forEach(function (element) {
                totalPublicaciones_1 += parseInt(element.publicaciones);
                totalVideos_1 += parseInt(element.videos);
                hora_1.setHours(element.horas);
                totalHoras_1 += hora_1.getHours(); //lo unico que se me ocurre es agarrar las horas sumarlas todas y despues sumar todos los minutos y divirlos
                totalRevisitas_1 += parseInt(element.revisitas);
                totalEstudios_1 += parseInt(element.estudios);
                html_1 += '<tr><td></td><td>' + element.id + '</td><td>' + element.fecha + '</td><td class="text-center">' + element.publicaciones + '</td>';
                html_1 += '<td class="text-center">' + element.videos + '</td>' + '<td>' + element.horas + '</td>';
                html_1 += '<td class="text-center">' + element.revisitas + '</td><td class="text-center">' + element.estudios + '</td>';
                html_1 += "<td><input type='button' value='Modificar' class='btn btn-warning' onclick='Modificar(" + JSON.stringify(element) + ")'></td>";
                html_1 += '<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar(' + element.id + ')"></td></tr>';
            });
            html_1 += '<tr><td>Total:</td><td class="text-left" colspan="2">' + totalDias + ' Dias</td><td class="text-center">' + totalPublicaciones_1 + '</td>';
            html_1 += '<td class="text-center">' + totalVideos_1 + '</td><td class="text-center">' + totalHoras_1 + '</td>';
            html_1 += '<td class="text-center">' + totalRevisitas_1 + '</td><td class="text-center">' + totalEstudios_1 + '</td></tr></table>';
            $("#tablaMes").html(html_1);
        }
    }).fail(function (jqxhr) {
        console.log(jqxhr.responseText);
    });
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
function Modificar(elemento) {
    $("#dateFecha").val(elemento.fecha);
    $("#txtPublicaciones").val(elemento.publicaciones);
    $("#txtVideos").val(elemento.videos);
    $("#txtHoras").val(elemento.horas);
    $("#txtRevisitas").val(elemento.revisitas);
    $("#txtEstudios").val(elemento.estudios);
    $("#btnAgregar").val("Modificar");
    $("#btnAgregar").attr("onclick", "Agregar('Modificar')");
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
///<reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="mes.ts"/>
function Agregar(caso) {
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
    }).fail(function (jqxhr) {
        var respuesta = JSON.parse(jqxhr.responseText);
        AlertDanger(respuesta.mensaje);
    });
}