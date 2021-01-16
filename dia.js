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
function Agregar() {
    var dia = {};
    var pagina = "BACKEND/dia/agregar";
    dia.fecha = $("#dateFecha").val();
    dia.publicaciones = $("#txtPublicaciones").val();
    dia.videos = $("#txtVideos").val();
    dia.horas = $("#txtHoras").val();
    dia.revisitas = $("#txtRevisitas").val();
    dia.estudios = $("#txtEstudios").val();
    if (AdministrarValidaciones(dia)) {
        var nombreArchivo = localStorage.getItem("nombreArchivo");
        var form = new FormData();
        form.append("cadenaJson", JSON.stringify(dia));
        form.append("nombreArchivo", nombreArchivo);
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
            console.log(jqxhr.responseText);
            var respuesta = JSON.parse(jqxhr.responseText);
            AlertDanger(respuesta.mensaje);
        });
    }
}
//Deberia verse selecionada la fila que voy a modificar
function CargarTabla() {
    var nombreArchivo = localStorage.getItem("nombreArchivo");
    var pagina = "BACKEND/dia/traerTodos/" + nombreArchivo;
    $.ajax({
        url: pagina,
        type: "get",
        dataType: "json",
        //contentType:false,
        //processData:false,
        async: true
    }).done(function (respuesta) {
        if (respuesta.exito) {
            if (respuesta.listaDias == false) {
                AlertWarning(respuesta.mensaje);
            }
            else {
                var fila_1 = 0;
                var listaDias = respuesta.listaDias;
                var total_1 = {};
                var arrayHoras_1 = Array();
                total_1.dias = listaDias.length;
                total_1.publicaciones = 0;
                total_1.videos = 0;
                total_1.revisitas = 0;
                total_1.estudios = 0;
                var archivo = localStorage.getItem("nombreArchivo");
                var html_1 = '<h1 style="padding-top: 2%;">' + archivo + '</h1> ';
                html_1 += '<div class="table-responsive">';
                html_1 += '<table class="table table-sm table-dark table-hover">';
                html_1 += '<tr><th></th><th>Nº</th><th class="text-center">Fecha</th><th class="text-center">Publicaciones</th><th class="text-center">Videos</th><th class="text-center">Horas</th>';
                html_1 += '<th class="text-center">Revisitas</th><th class="text-center">Estudios</th><th>Modificar</th><th>Eliminar</th></tr>';
                listaDias.forEach(function (element) {
                    fila_1++;
                    total_1.publicaciones += parseInt(element.publicaciones);
                    total_1.videos += parseInt(element.videos);
                    arrayHoras_1.push(element.horas);
                    total_1.revisitas += parseInt(element.revisitas);
                    total_1.estudios += parseInt(element.estudios);
                    html_1 += '<tr onclick="SeleccionarFilaPrimary(' + fila_1 + "," + total_1.dias + ')" id="fila-' + fila_1 + '" ><td></td>';
                    html_1 += '<td class="text-center">' + fila_1 + '</td><td class="text-center">' + element.fecha + '</td>' + '<td class="text-center">' + element.publicaciones + '</td>';
                    html_1 += '<td class="text-center">' + element.videos + '</td>' + '<td class="text-center">' + element.horas + '</td>';
                    html_1 += '<td class="text-center">' + element.revisitas + '</td><td class="text-center">' + element.estudios + '</td>';
                    html_1 += "<td><input type='button' value='Modificar' class='btn btn-warning' onclick='ArmarModificar(" + JSON.stringify(element) + "," + fila_1 + ")'></td>";
                    html_1 += '<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar(' + element.id + "," + fila_1 + ')"></td></tr>';
                });
                total_1.horas = CalcularTotalHoras(arrayHoras_1);
                html_1 += '<tr><td>Total:</td><td class="text-left" colspan="2">' + total_1.dias + ' Dias</td><td class="text-center">' + total_1.publicaciones + '</td>';
                html_1 += '<td class="text-center">' + total_1.videos + '</td><td class="text-center">' + total_1.horas + '</td>';
                html_1 += '<td class="text-center">' + total_1.revisitas + '</td><td class="text-center">' + total_1.estudios + '</td></tr></table></div>';
                html_1 += '<input type="button" value="Generar Informe" class="btn btn-primary" id="btnInforme">';
                html_1 += '<div id="divInforme" class="mt-2"></div>';
                $("#tablaMes").html(html_1);
                $("#btnInforme").attr("onclick", "GenerarInforme(" + JSON.stringify(total_1) + ")");
                //GenerarInforme(total);
            }
        }
    }).fail(function (jqxhr) {
        console.log(jqxhr.responseText);
    });
}
function GenerarInforme(total) {
    // total=JSON.parse(total);
    console.log(total);
    total.minutos = total.horas.split(":")[1];
    total.horas = total.horas.split(":")[0];
    if (total.minutos == "00") {
        AlertInforme("<strong>Informe: </strong>" + "</br>" +
            "Publicaciones: " + total.publicaciones + "</br>" +
            "Videos: " + total.videos + "</br>" +
            "Horas: " + total.horas + "</br>" +
            "Revisitas: " + total.revisitas + "</br>" +
            "Estudios: " + total.estudios);
    }
    else {
        AlertInforme("<strong>Informe: </strong>" + "</br>" +
            "Publicaciones: " + total.publicaciones + "</br>" +
            "Videos: " + total.videos + "</br>" +
            "Horas: " + total.horas + "</br>" +
            "Revisitas: " + total.revisitas + "</br>" +
            "Estudios: " + total.estudios + "</br>" + "</br>" +
            "Le han sobrado " + total.minutos + "min.");
    }
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
function Eliminar(id, fila) {
    var pagina = "BACKEND/dia/borrar";
    if (confirm("Desea eliminar la fila nº" + fila)) {
        var archivo = localStorage.getItem("nombreArchivo");
        $.ajax({
            url: pagina,
            type: "delete",
            data: { "id": id, "archivo": archivo },
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
    dia.archivo = localStorage.getItem("nombreArchivo");
    if (AdministrarValidaciones(dia)) {
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
}
function ArmarAgregar() {
    $("#dateFecha").val("");
    $("#txtPublicaciones").val("");
    $("#txtVideos").val("");
    $("#txtHoras").val("00:00");
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
    AlertWarning("<strong>Cuidado!!!</strong> Fila nº " + fila + " seleccionada para modificar");
}
function AdministrarValidaciones(dia) {
    var flagHoras = true;
    var retorno = false;
    if (dia.horas.length == 0 || dia.horas == "00:00") {
        flagHoras = false;
    }
    if (!flagHoras) {
        AlertDanger('<strong>Error!!!</strong> El campo <strong>"Horas"</strong> es obligatorio');
    }
    else {
        retorno = true;
    }
    return retorno;
}
function pruebaPHP()
{
    console.log("hola mundo");
    return "HolaaaaA mundodooodododod";
}