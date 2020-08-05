///<reference path="node_modules/@types/jquery/index.d.ts" />




function Agregar()
{
    let dia:any={};
    let pagina="BACKEND/dia/agregar";

    dia.fecha=$("#dateFecha").val();
    dia.publicaciones=$("#txtPublicaciones").val();
    dia.videos=$("#txtVideos").val();
    dia.horas=$("#txtHoras").val();
    dia.revisitas=$("#txtRevisitas").val();
    dia.estudios=$("#txtEstudios").val();

    if(AdministrarValidaciones(dia))
    {
        let form = new FormData();
        form.append("cadenaJson",JSON.stringify(dia));

        $.ajax({
            url:pagina,
            type:"post",
            data:form,
            dataType:"json",
            contentType:false,
            processData:false,
            async:true
        }).done(function(respuesta){
            AlertSuccess(respuesta.mensaje);
            CargarTabla();
            ArmarAgregar();
        }).fail(function(jqxhr){
            console.log(jqxhr.responseText);
            let respuesta=JSON.parse(jqxhr.responseText);
            AlertDanger(respuesta.mensaje);
        });
    }

    
    
}


//Deberia verse selecionada la fila que voy a modificar

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
            let listaDias=respuesta.listaDias;
            let totalPublicaciones=0;
            let totalVideos=0;
            let acumuladorTime=new Date();
            let totalRevisitas=0;
            let totalEstudios=0;
            let totalDias=listaDias.length;
            let aux=new Date();            
            let arrayHoras=Array();
           
            

            
            let html='<h1 >Mes Actual</h1>';
            html+='<table class="table table-sm table-dark table-hover mt-3">';
            html+='<tr><th></th><th>Nº</th><th>Fecha</th><th>Publicaciones</th><th>Videos</th><th>Horas</th>';
            html+='<th>Revisitas</th><th>Estudios</th><th>Modificar</th><th>Eliminar</th></tr>';
            listaDias.forEach(element => {
                fila++;
                totalPublicaciones+=parseInt(element.publicaciones);
                totalVideos+=parseInt(element.videos);
                arrayHoras.push(element.horas);
                totalRevisitas+=parseInt(element.revisitas);
                totalEstudios+=parseInt(element.estudios);

                html+='<tr"><td></td><td>'+fila+'</td><td>'+element.fecha+'</td><td class="text-center">'+element.publicaciones+'</td>';
                html+='<td class="text-center">'+element.videos+'</td>'+'<td>'+element.horas+'</td>';
                html+='<td class="text-center">'+element.revisitas+'</td><td class="text-center">'+element.estudios+'</td>';    
                html+="<td><input type='button' value='Modificar' class='btn btn-warning' onclick='ArmarModificar("+JSON.stringify(element) +","+fila+")'></td>";
                html+='<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar('+element.id+')"></td></tr>';
            });
            let totalHoras=CalcularTotalHoras(arrayHoras);
            html+='<tr><td>Total:</td><td class="text-left" colspan="2">'+totalDias+' Dias</td><td class="text-center">'+totalPublicaciones+'</td>';
            html+='<td class="text-center">'+totalVideos+'</td><td class="text-center">'+totalHoras+'</td>';
            html+='<td class="text-center">'+totalRevisitas+'</td><td class="text-center">'+totalEstudios+'</td></tr></table>';
          
           
            $("#tablaMes").html(html);
        }


    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
    });
    
}

function CalcularTotalHoras(arrayHoras)
{
    let aux=new Date();
        aux.setHours(0,0);
    let horas=0;
    let minutos=0;
    let retorno="00:00";

    horas=arrayHoras.map(function(element,index,array){
        return parseInt(element.split(":")[0]);
    }).reduce(function(anterior,siguiente,index,array){
        return anterior+ siguiente;
    });

    minutos=arrayHoras.map(function(element,index,array){
        return parseInt(element.split(":")[1]);
    }).reduce(function(anterior,siguiente,index,array){
        return anterior+ siguiente;
    });

    aux.setMinutes(minutos);
    if(aux.getMinutes().toString().length==1)
    {
        retorno=horas+aux.getHours() + ":0" + aux.getMinutes();
    }
    else
    {
        retorno=horas+aux.getHours() + ":" + aux.getMinutes();
    }

    return retorno;
}


//Cambiar confirm por ventana Modal

function Eliminar(id)
{
    let pagina="BACKEND/dia/borrar";

    if(confirm("Desea eliminar la fila nº" + id))
    {
        $.ajax({
            url:pagina,
            type:"delete",
            data:{"id":id},
            dataType:"json",
            async:true
        }).done(function(resultado){
            CargarTabla();
            AlertSuccess(resultado.mensaje);
    
        }).fail(function(jqxhr){
            
            let respuesta=JSON.parse( jqxhr.responseText);
            
            AlertDanger(respuesta.mensaje);
        });
    }    
}

function Modificar(id)
{
    let dia:any={};
    let pagina="BACKEND/dia/modificar";
    dia.id=id;
    dia.fecha=$("#dateFecha").val();
    dia.publicaciones=$("#txtPublicaciones").val();
    dia.videos=$("#txtVideos").val();
    dia.horas=$("#txtHoras").val();
    dia.revisitas=$("#txtRevisitas").val();
    dia.estudios=$("#txtEstudios").val();
    

    let json={"cadenaJson":dia}

    $.ajax({
        url:pagina,
        type:"put",
        data:json,
        dataType:"json",
       // contentType:false,
       // processData:false,
        async:true
    }).done(function(respuesta){
        AlertSuccess(respuesta.mensaje);
        CargarTabla();
        ArmarAgregar();
    }).fail(function(jqxhr){
        let respuesta=JSON.parse(jqxhr.responseText);
        AlertDanger(respuesta.mensaje);

    });
}

function ArmarAgregar()
{    
    $("#dateFecha").val("");
    $("#txtPublicaciones").val("");
    $("#txtVideos").val("");
    $("#txtHoras").val("00:00");
    $("#txtRevisitas").val("");
    $("#txtEstudios").val("");
    $("#btnAgregar").val("Agregar");
    $("#btnAgregar").attr("onclick","Agregar()");
}

function ArmarModificar(elemento,fila)
{ 
    $("#dateFecha").val(elemento.fecha);
    $("#txtPublicaciones").val(elemento.publicaciones);
    $("#txtVideos").val(elemento.videos);
    $("#txtHoras").val(elemento.horas);
    $("#txtRevisitas").val(elemento.revisitas);
    $("#txtEstudios").val(elemento.estudios);
    $("#btnAgregar").val("Modificar");
    $("#btnAgregar").attr("onclick","Modificar("+elemento.id+")");
    AlertWarning("<strong>Cuidado!!!</strong> Fila nº "+fila+" seleccionada para modificar");
}

function AdministrarValidaciones(dia)
{
    let flagFecha=true;
    let flagHoras=true;
    let retorno=false;
    
    

    if(dia.fecha.length==0)
    {
        flagFecha=false;
    }

    if(dia.horas.length==0 || dia.horas=="00:00")
    {
        flagHoras=false;
    }

    if(!flagFecha || !flagHoras)
    {
        AlertDanger("<strong>Error!!!</strong> Los campos fecha y horas son obligatorios");
    }
    else
    {
        retorno=true;
    }

    return retorno;
}


//#region Alerts
//class=alert-dissmisable
function AlertSuccess(mensaje)
{
    let html='<div class="alert alert-success">'+mensaje+'</div>';
    $("#divAlert").html(html);
}

function AlertDanger(mensaje)
{
    let html='<div class="alert alert-danger alert-dissmisable">'+mensaje+'</div>';
    $("#divAlert").html(html);
}

function AlertWarning(mensaje)
{
    let html='<div class="alert alert-warning alert-dissmisable">'+mensaje+'</div>';
    $("#divAlert").html(html);
}
//#endregion