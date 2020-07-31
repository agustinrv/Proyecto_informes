<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


use Firebase\JWT\JWT;


class Dia
{
    public $fecha;
    public $publicaciones;
    public $videos;
    public $horas;
    public $revisitas;
    public $estudios;

    public function __construct($_fecha,$_publicaciones=0,$_videos=0,
                                $_horas=0,$_revisitas=0,$_estudios=0){
    
        $this->fecha=$_fecha;
        $this->publicaciones=$_publicaciones;
        $this->videos=$_videos;
        $this->horas=$_horas;
        $this->revisitas=$_revisitas;
        $this->estudios=$_estudios;

    }

    ///Es posible que esto no se use
    public function ToJson()
    {
        $jsonDia = new stdClass();
        $jsonDia->fecha= $this->fecha;
        $jsonDia->publicaciones= $this->publicaciones;
        $jsonDia->videos= $this->videos;
        $jsonDia->horas= $this->horas;
        $jsonDia->revisitas= $this->revisitas;
        $jsonDia->estudios= $this->estudios;

        return $jsonDia;
    }
    ///Es posible que esto no se use
    public function ToString()
    {
        return $this->fecha . " - " .$this->publicaciones . " - " .$this->videos . 
                " - " .$this->horas . " - " .$this->revisitas . " - " .$this->estudios;
    }

    private static function AgregarEnArchivoJSON(stdClass $json)
    {
        $path="./Meses/ejemplo.json";
        $archivo=fopen($path,"a");
        $retorno=false;
        $cadenaJson=json_encode($json);

        if(isset($archivo))
        {
            fwrite($archivo,$cadenaJson . "\n");
            fclose($archivo);
            $retorno=true;
        }

        return $retorno;
    }



    public static function AgregarUno(Request $request,Response $response,$args)
    {   
        $recibo=$request->getParsedBody();
        $json=json_decode($recibo["cadenaJson"]);
        $retorno= new stdClass();

        if(self::AgregarEnArchivoJSON($json))
        {
            $retorno->exito=true;
            $retorno->status=200;
            $retorno->mensaje="Se a Agregado exitosamente!!!";
        }
        else
        {
        
            $retorno->exito=false;
            $retorno->status=400;
            $retorno->mensaje="No se a podido agregar";
        }

        return $response->withJson($retorno,$retorno->status);
    }


    private static function TraerTodosJSON()
    {
        $path="./Meses/ejemplo.json";
        $archivo=fopen($path,"a");
        $retorno=new stdClass();
        $lista=array();
        $retorno->exito=false;
        $retorno->lista=$lista;

        if(isset($archivo))
        {
            
            while(!feof($archivo))
            {
                $cadenaJson=fgets($archivo);
                $json=json_decode($cadenaJson);
                array_push($lista,$json);
            }

            fclose($archivo);
            $retorno->lista=$lista;
            $retorno->exito=true;
        }

        return $retorno;
    }

    public static function TraerTodos(Request $request,Response $response,$args)
    {
        $json=self::TraerTodosJSON();
        $retorno = new stdClass();

        if($json->exito)
        {
            $retorno->exito=true;
            $retorno->status=200;
            $retorno->mensaje="Se han recuperado exitosamente!!!";
            $retorno->listaDias=$json->lista;
        }
        else
        {
            $retorno->exito=false;
            $retorno->status=400;
            $retorno->mensaje="No se han podido recuperar";
        }

        return $response->withJson($retorno,$retorno->status);
    }



}


