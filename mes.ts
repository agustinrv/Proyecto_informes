///<reference path="node_modules/@types/jquery/index.d.ts" />

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
            let totalHoras=0;
            let totalRevisitas=0;
            let totalEstudios=0;
            let totalDias=listaDias.length;            
           // let hora= new Date();
            
            let html='<h1 >Mes Actual</h1>';
            html+='<table class="table table-sm table-dark table-hover mt-3">';
            html+='<tr><th></th><th>Nº</th><th>Fecha</th><th>Publicaciones</th><th>Videos</th><th>Horas</th>';
            html+='<th>Revisitas</th><th>Estudios</th><th>Modificar</th><th>Eliminar</th></tr>';
            listaDias.forEach(element => {
                fila++;
                totalPublicaciones+=parseInt(element.publicaciones);
                totalVideos+=parseInt(element.videos);
              //  hora.setHours(element.horas);  
                //totalHoras+=hora.getHours();       //lo unico que se me ocurre es agarrar las horas sumarlas todas y despues sumar todos los minutos y divirlos
                totalRevisitas+=parseInt(element.revisitas);
                totalEstudios+=parseInt(element.estudios);

                html+='<tr"><td></td><td>'+fila+'</td><td>'+element.fecha+'</td><td class="text-center">'+element.publicaciones+'</td>';
                html+='<td class="text-center">'+element.videos+'</td>'+'<td>'+element.horas+'</td>';
                html+='<td class="text-center">'+element.revisitas+'</td><td class="text-center">'+element.estudios+'</td>';    
                html+="<td><input type='button' value='Modificar' class='btn btn-warning' onclick='Modificar("+JSON.stringify(element) +")'></td>";
                html+='<td><input type="button" value="Eliminar" class="btn btn-danger" onclick="Eliminar('+element.id+')"></td></tr>';
            });
            html+='<tr><td>Total:</td><td class="text-left" colspan="2">'+totalDias+' Dias</td><td class="text-center">'+totalPublicaciones+'</td>';
            html+='<td class="text-center">'+totalVideos+'</td><td class="text-center">'+totalHoras+'</td>';
            html+='<td class="text-center">'+totalRevisitas+'</td><td class="text-center">'+totalEstudios+'</td></tr></table>';
          
           
            $("#tablaMes").html(html);
        }


    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
    });
    
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

function Modificar(elemento)
{ 
    $("#dateFecha").val(elemento.fecha);
    $("#txtPublicaciones").val(elemento.publicaciones);
    $("#txtVideos").val(elemento.videos);
    $("#txtHoras").val(elemento.horas);
    $("#txtRevisitas").val(elemento.revisitas);
    $("#txtEstudios").val(elemento.estudios);
    $("#btnAgregar").val("Modificar");
    $("#btnAgregar").attr("onclick","Agregar('Modificar')");
    AlertWarning("Cuidado!!! Linea nº "+elemento.id+" seleccionada para modificar");
}

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