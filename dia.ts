///<reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="./genericas.ts" />
///<reference path="./index.php" />






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
        let nombreArchivo=localStorage.getItem("nombreArchivo");
        let form = new FormData();
        form.append("cadenaJson",JSON.stringify(dia));
        form.append("nombreArchivo",nombreArchivo);

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
    let nombreArchivo=localStorage.getItem("nombreArchivo");

    let pagina="BACKEND/dia/traerTodos/" + nombreArchivo;
    
    $.ajax({
        url:pagina,
        type:"get",
        dataType:"json",
        //contentType:false,
        //processData:false,
        async:true
    }).done(function(respuesta){

        
        if(respuesta.exito)
        {
            if(respuesta.listaDias==false)
            {
                AlertWarning(respuesta.mensaje)
            }
            else
            {
                let listaDias=respuesta.listaDias;
                let nombreArchivo=localStorage.getItem("nombreArchivo");
                let form = new FormData();
                form.append("cadenaJson",JSON.stringify(respuesta));

                $.ajax({
                    url:"index.php",
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


    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
    });
    
}
function GenerarInforme(total)
{
   // total=JSON.parse(total);
   console.log(total);
    total.minutos=total.horas.split(":")[1];
    total.horas=total.horas.split(":")[0];

    if(total.minutos=="00")
    {
        AlertInforme("<strong>Informe: </strong>"+"</br>"+
        "Publicaciones: " +  total.publicaciones + "</br>"+
        "Videos: " + total.videos + "</br>"+
        "Horas: " + total.horas + "</br>"+
        "Revisitas: " + total.revisitas + "</br>"+
        "Estudios: " + total.estudios);
    }
    else
    {
        AlertInforme("<strong>Informe: </strong>"+"</br>"+
        "Publicaciones: " +  total.publicaciones + "</br>"+
        "Videos: " + total.videos + "</br>"+
        "Horas: " + total.horas + "</br>"+
        "Revisitas: " + total.revisitas + "</br>"+
        "Estudios: " + total.estudios+"</br>"+"</br>"+
        "Le han sobrado "+total.minutos + "min.");
    }
    
                

    
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

function Eliminar(id,fila)
{
    let pagina="BACKEND/dia/borrar";

    if(confirm("Desea eliminar la fila nº" + fila))
    {
        let archivo= localStorage.getItem("nombreArchivo");
        $.ajax({
            url:pagina,
            type:"delete",
            data:{"id":id,"archivo":archivo},
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
    dia.archivo=localStorage.getItem("nombreArchivo");
    
    if(AdministrarValidaciones(dia))
    {
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
    let flagHoras=true;
    let retorno=false;

    if(dia.horas.length==0 || dia.horas=="00:00")
    {
        flagHoras=false;
    }

    if(!flagHoras)
    {
        AlertDanger('<strong>Error!!!</strong> El campo <strong>"Horas"</strong> es obligatorio');
    }
    else
    {
        retorno=true;
    }

    return retorno;
}

