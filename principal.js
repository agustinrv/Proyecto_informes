function SeleccionarFilaPrimary(numero, cantidad) {
    for (var i = 1; i <= cantidad; i++) {
        if (i != numero)
            $("#fila-" + i).removeClass("bg-primary");
    }
    ///no entra al else
    if (!$("#fila-" + numero).hasClass("bg-primary")) {
        $("#fila-" + numero).addClass("bg-primary");
    }
    else {
        $("#fila-" + numero).removeClass("bg-primary");
    }
}
function SeleccionarFilaModificar(numero, cantidad) {
    for (var i = 1; i <= cantidad; i++) {
        $("#fila-" + i).removeClass("bg-warning");
    }
    ///no entra al else
    if ($("#fila-" + numero).hasClass("bg-warning")) {
        $("#fila-" + numero).addClass("bg-warning");
    }
    else {
        $("#fila-" + numero).removeClass("bg-warning");
    }
}
//#region Alerts
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
function AlertInforme(mensaje) {
    var html = '<div class="alert alert-info alert-dissmisable">' + mensaje + '</div>';
    $("#divInforme").html(html);
}
//#endregion
///<reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="./genericas.ts" />
//Falta boton descargar
function CargarTabla() {
    var pagina = "BACKEND/mes/traerTodos";
    $.ajax({
        url: pagina,
        type: "get",
        dataType: "json",
        //contentType:false,
        //  processData:false,
        async: true
    }).done(function (respuesta) {
        var fila = 0;
        var listaMeses = respuesta;
        var total = {};
        console.log(respuesta);
        total.meses = listaMeses.length;
        var html = '<h1 style="padding-top: 2%;">Año Actual</h1> ';
        html += '<table class="table table-sm table-dark table-hover">';
        html += '<tr><th ></th><th>Nº</th><th>Mes</th><th class="h6">Fecha Mod.</th>';
        html += '<th class="text-center">Abrir</th><th class="pl-3">Eliminar</th><th class="text-left">Descargar</th></tr>';
        listaMeses.forEach(function (element) {
            fila++;
            html += '<tr onclick="SeleccionarFilaPrimary(' + fila + ',' + total.meses + ')" id="fila-' + fila + '"><td></td><td>' + fila + '</td><td>' + element.nombre + '</td><td>' + element.fecha + '</td>';
            html += "<td><input type='button' value='Abrir' class='btn btn-success btn-block' onclick='ArmarModificar(" + JSON.stringify(element) + "," + fila + ")'></td>";
            html += '<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar(' + element.nombre + ')"></td>';
            html += '<td><input type="button" value="Descargar" class="btn btn-info" onclick="Descargar()"></td></tr>';
        });
        html += '<tr><td>Total:</td><td class="text-left" colspan="2">' + total.meses + ' Meses</td>';
        html += '</table>';
        html += '<input type="button" value="Generar PDF" class="btn btn-primary" id="btnPdf">';
        $("#tablaMes").html(html);
        //GenerarInforme(total);
    }).fail(function (jqxhr) {
        console.log(jqxhr.responseText);
    });
}
function Agregar() {
    var nuevoMes = $("#cboMeses").val();
    var pagina = "BACKEND/mes/agregar";
    var form = new FormData();
    form.append("cadenaJson", nuevoMes);
    $.ajax({
        url: pagina,
        type: "post",
        data: form,
        dataType: "json",
        contentType: false,
        processData: false,
        async: true
    }).done(function (respuesta) {
        CargarTabla();
        AlertSuccess(respuesta.mensaje);
    }).fail(function (jqxhr) {
        console.log(jqxhr.responseText);
        var respuesta = JSON.parse(jqxhr.responseText);
        AlertDanger(respuesta.mensaje);
    });
}
