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
    dia.estudios=$("#Estudios").val();


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
        console.log(respuesta);


    }).fail(function(jqxhr){
        console.log(jqxhr.responseText);
    });
    
}