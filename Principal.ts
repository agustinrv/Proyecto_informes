///<reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="./genericas.ts" />
//Falta boton descargar


function CargarTabla()
{
    let pagina="BACKEND/mes/traerTodos";
    $.ajax({
        url:pagina,
        type:"get",
        dataType:"json",
        //contentType:false,
      //  processData:false,
        async:true
    }).done(function(respuesta){

        let fila=0;       
        let listaMeses=respuesta;
        let total:any={};
        console.log(respuesta);

        total.meses=listaMeses.length;
    
        let html='<h1 style="padding-top: 2%;">Año Actual</h1> ';
        html+='<table class="table table-sm table-dark table-hover">';
        html+='<tr><th ></th><th>Nº</th><th>Mes</th><th class="h6">Fecha Mod.</th>';
        html+='<th class="text-center">Abrir</th><th class="pl-3">Eliminar</th><th class="pl-3">Descargar</th></tr>';
        listaMeses.forEach(element => {
            fila++;
            html+='<tr onclick="SeleccionarFilaPrimary('+fila+','+total.meses+')" id="fila-'+ fila +'"><td></td><td>'+fila+'</td><td>'+element.nombre+'</td><td>'+element.fecha+'</td>';
            html+="<td><input type='button' value='Abrir' class='btn btn-success btn-block' onclick='ArmarModificar("+JSON.stringify(element) +","+fila+")'></td>";
            html+='<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar('+element.nombre+')"></td>';
            html+='<td><input type="button" value="Descargar" class="btn btn-info" onclick="Descargar()"></td></tr>';
        });
        html+='<tr><td>Total:</td><td class="text-left" colspan="2">'+total.meses+' Meses</td>';
        html+='</table>';
        html+='<input type="button" value="Generar PDF" class="btn btn-primary" id="btnPdf">';
        $("#tablaMes").html(html);
    
        //GenerarInforme(total);
    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
    });
    
}

function Agregar()
{
    let nuevoMes:any=$("#cboMeses").val();
    let pagina="BACKEND/mes/agregar";
    
    let form = new FormData();
    form.append("cadenaJson",nuevoMes);

    $.ajax({
        url:pagina,
        type:"post",
        data:form,
        dataType:"json",
        contentType:false,
        processData:false,
        async:true
    }).done(function(respuesta){
        CargarTabla();
        AlertSuccess(respuesta.mensaje);
    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
        let respuesta=JSON.parse(jqxhr.responseText);
        AlertDanger(respuesta.mensaje);
    });
}



