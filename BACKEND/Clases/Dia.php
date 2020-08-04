<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


use Firebase\JWT\JWT;


class Dia
{
    public $id;
    public $fecha;
    public $publicaciones;
    public $videos;
    public $horas;
    public $revisitas;
    public $estudios;

    public function __construct($_id,$_fecha,$_publicaciones=0,$_videos=0,
                                $_horas=0,$_revisitas=0,$_estudios=0){
        $this->id=$_id;                                    
        $this->fecha=$_fecha;
        $this->publicaciones=$_publicaciones;
        $this->videos=$_videos;
        $this->horas=$_horas;
        $this->revisitas=$_revisitas;
        $this->estudios=$_estudios;
    }

    public static function GenerarID()
    {
        $lista=self::TraerTodosJSON();
        $lista=$lista;
        $retorno=1;
        if(!empty($lista))
        {
            $i=count($lista)-1;
            $retorno=$lista[$i]->id+1;
        }
        return $retorno;
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
        $json->id= self::GenerarID();
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
        $archivo=fopen($path,"r");
        $listaRetorno=array();
        $listaRetorno;

        if(isset($archivo))
        {
            
            while(!feof($archivo))
            {
                $cadenaJson=fgets($archivo);
                if(!empty($cadenaJson))
                {
                    $json=json_decode($cadenaJson);
                    array_push($listaRetorno,$json);
                }

                
            }

            fclose($archivo);
        }

        return $listaRetorno;
    }

    public static function TraerTodos(Request $request,Response $response,$args)
    {
        $lista=self::TraerTodosJSON();
        $retorno = new stdClass();

        if(!empty($lista))
        {
            $retorno->exito=true;
            $retorno->status=200;
            $retorno->mensaje="Se han recuperado exitosamente!!!";
            $retorno->listaDias=$lista;
        }
        else
        {
            $retorno->exito=false;
            $retorno->status=400;
            $retorno->mensaje="No se han podido recuperar";
        }

        return $response->withJson($retorno,$retorno->status);
    }
    public static function EscribirEnArchivoJSON($lista)
    {
        $path="./Meses/ejemplo.json";
        $archivo=fopen($path,"w");
        $retorno=false;
        
        if(isset($archivo))
        {
            foreach ($lista as $key => $i) {
                $cadenaJson=json_encode($i);
                fwrite($archivo,$cadenaJson . "\n");    
            }
            
            fclose($archivo);
            $retorno=true;
        }

        return $retorno;
    }

    public static function BorrarUnoJSON($id)
    {
        $lista=self::TraerTodosJSON();
        $nuevaLista=array();
        $retorno=false;

        foreach ($lista as $key => $i) {
            
            if($i->id==$id)
            {
                $retorno =true;
                continue;
            }
            array_push($nuevaLista,$i);
        }
        if($retorno==true)
        {
            self::EscribirEnArchivoJSON($nuevaLista);
        }

        return $retorno;
    }

    public static function BorrarUno(Request $request,Response $response,$args)
    {
        $recibo=$request->getParsedBody();
        
        $id=$recibo["id"];
        $retorno=new stdClass();        

        if(self::BorrarUnoJson($id))
        {
            $retorno->exito=true;
            $retorno->mensaje="Se a eliminado exitosamente";
            $retorno->status=200;
        }
        else 
        {
            
            $retorno->status=400;
            $retorno->exito=false;
            $retorno->mensaje="No se a podido eliminar";
        }

        return $response->withJson($retorno,$retorno->status);
    }

    public static function ModificarEnArchivoJSON($elemento)
    {
        $lista=self::TraerTodosJSON();
        $nuevaLista=array();
        $retorno=false;

        foreach ($lista as $key => $i) {
            
            if($i->id==$elemento->id)
            {
                $retorno=true;
                array_push($nuevaLista,$elemento);    
                continue;
            }
            array_push($nuevaLista,$i);
        }
        if($retorno==true)
        {
            self::EscribirEnArchivoJSON($nuevaLista);
        }

        return $retorno;




    }


    public static function ModificarUno(Request $request,Response $response,$args)
    {
        $recibo=$request->getParsedBody();
        $json=(object)$recibo["cadenaJson"];
        $retorno= new stdClass();


        if(self::ModificarEnArchivoJSON($json))
        {
            $retorno->exito=true;
            $retorno->status=200;
            $retorno->mensaje="Se a modificado exitosamente!!!";
        }
        else
        {
        
            $retorno->exito=false;
            $retorno->status=400;
            $retorno->mensaje="No se a podido modificar";
        }

        return $response->withJson($retorno,$retorno->status);
    }



}


