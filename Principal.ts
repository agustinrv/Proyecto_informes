///<reference path="node_modules/@types/jquery/index.d.ts" />



function CargarTabla()
{
    let pagina="BACKEND/dia/traerTodos";
    $.ajax({
        url:pagina,
        type:"get",
        dataType:"json",
        //contentType:false,
      //  processData:false,
        async:true
    }).done(function(respuesta){
        if(respuesta.exito)
        {
            let fila=0;
            let listaMeses=respuesta.listaDias;
            let total:any={};

            total.meses=listaMeses.length;
           
            
            let html='<h1 style="padding-top: 2%;">Año Actual</h1> ';
            html+='<table class="table table-sm table-dark table-hover">';
            html+='<tr><th></th><th>Nº</th><th>Mes</th><th class="h6">Fecha Mod.</th>';
            html+='<th class="text-center">Abrir</th><th class="pl-3">Eliminar</th></tr>';
            listaMeses.forEach(element => {
                fila++;
                html+='<tr"><td></td><td>'+fila+'</td><td>'+element.mes+'</td><td>'+element.fecha+'</td>';
                html+="<td><input type='button' value='Abrir' class='btn btn-success btn-block' onclick='ArmarModificar("+JSON.stringify(element) +","+fila+")'></td>";
                html+='<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar('+element.id+')"></td></tr>';
            });
            html+='<tr><td>Total:</td><td class="text-left" colspan="2">'+total.meses+' Meses</td>';
            html+='</table>';
            html+='<input type="button" value="Generar PDF" class="btn btn-primary" id="btnPdf">';
            //html+='<div id="divTotalMeses" class="mt-2"></div>';

            $("#tablaMes").html(html);
         //   $("#btnInforme").attr("onclick","GenerarInforme("+JSON.stringify(total)+")");
            //GenerarInforme(total);
        }


    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
    });
    
}