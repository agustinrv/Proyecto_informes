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
            var fila_1 = 0;
            var listaMeses = respuesta.listaDias;
            var total = {};
            total.meses = listaMeses.length;
            var html_1 = '<h1 style="padding-top: 2%;">Año Actual</h1> ';
            html_1 += '<table class="table table-sm table-dark table-hover">';
            html_1 += '<tr><th></th><th>Nº</th><th>Mes</th><th class="h6">Fecha Mod.</th>';
            html_1 += '<th class="text-center">Abrir</th><th class="pl-3">Eliminar</th></tr>';
            listaMeses.forEach(function (element) {
                fila_1++;
                html_1 += '<tr"><td></td><td>' + fila_1 + '</td><td>' + element.mes + '</td><td>' + element.fecha + '</td>';
                html_1 += "<td><input type='button' value='Abrir' class='btn btn-success btn-block' onclick='ArmarModificar(" + JSON.stringify(element) + "," + fila_1 + ")'></td>";
                html_1 += '<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar(' + element.id + ')"></td></tr>';
            });
            html_1 += '<tr><td>Total:</td><td class="text-left" colspan="2">' + total.meses + ' Meses</td>';
            html_1 += '</table>';
            html_1 += '<input type="button" value="Generar PDF" class="btn btn-primary" id="btnPdf">';
            //html+='<div id="divTotalMeses" class="mt-2"></div>';
            $("#tablaMes").html(html_1);
            //   $("#btnInforme").attr("onclick","GenerarInforme("+JSON.stringify(total)+")");
            //GenerarInforme(total);
        }
    }).fail(function (jqxhr) {
        console.log(jqxhr.responseText);
    });
}
