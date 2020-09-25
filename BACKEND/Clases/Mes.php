<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use Firebase\JWT\JWT;

class Mes
{
   // public $id;
    public $lista;
    public $mes;
    public $fechaModificacion;

    public function __construct($_mes,$_fechaModificacion,$_lista="")
    {
        //$this->id=self::GenerarID();
        $this->mes=$_mes;
        $this->fechaModificacion=$_fechaModificacion;
        $this->lista=$_lista;
    }

    public function ToString()
    {
        return $this->mes . " - " . $this->fechaModificacion;
    }

    public function ToJson()
    {
        $unMes = new stdClass();
        $unMes->mes=$this->mes;
        $unMes->fechaModificacion=$this->fechaModificacion;
        
        return $unMes;
    }

   
    public static function Existe(Request $request,Response $response ,$next)
    {
        $recibo=$request->getParsedBody();
        $nuevoArchivo=$recibo["cadenaJson"] . ".json";
        $flag=true;

        $listaArchivos=self::ObtenerNombresArchivos();

        if(isset($listaArchivos))
        {
            foreach ($listaArchivos as $key => $value) {
                if($value->nombre==$nuevoArchivo)
                {
                    $flag=false;
                    break;
                }
            }
        }

        if($flag)
        {
            $response=$next($request,$response);
        }
        else
        {
            $retorno=new stdClass();
            $retorno->exito=false;
            $retorno->mensaje="<strong>Error,el archivo ya existe.</strong> Puede borrar el Archivo y volver a agregarlo si desea hacer esta operacion";
            $retorno->status=400;
            $response=$response->withJson($retorno,$retorno->status);
        }

        return $response;
    }

    public static function CrearArchivoJson($nombreArchivo)
    {
        $retorno=false;
        $archivo=null;

        if($nombreArchivo!="null")
        {
            $path="./Meses/" . $nombreArchivo .".json";
            $archivo=fopen($path,"w");
        }
        
        if(isset($archivo))
        {
            $retorno=true;
        }
        return $retorno;
    }



    public static function AgregarUno(Request $request,Response $response ,$args)
    {
        $recibo=$request->getParsedBody();
        
        $nombreArchivo=$recibo["cadenaJson"];  
        $retorno= new stdClass();

        if(self::CrearArchivoJson($nombreArchivo))
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

    public static function GenerarID($nombreArchivo)
    {
        $retorno=0;
        
        switch($nombreArchivo)
        {
            case "Enero.json":
                $retorno=1;
            break;
            case "Febrero.json":
                $retorno=2;
            break;
            case "Marzo.json":
                $retorno=3;
            break;
            case "Abril.json":
                $retorno=4;
            break;
            case "Mayo.json":
                $retorno=5;
            break;
            case "Junio.json":
                $retorno=6;
            break;
            case "Julio.json":
                $retorno=7;
            break;
            case "Agosto.json":
                $retorno=8;
            break;
            case "Septiembre.json":
                $retorno=9;
            break;
            case "Octubre.json":
                $retorno=10;
            break;
            case "Noviembre.json":
                $retorno=11;
            break;
            case "Diciembre.json":
                $retorno=12;
            break;
        }

        return $retorno;
    }


    public static function ObtenerNombresArchivos()
    {
        $flag=false;
        $archivos=scandir("./Meses");
        $retorno=null;
        
        if(isset($archivos))
        {
            if(!empty($archivos))
            {
                $flag=true;
            }
        }
        
        if($flag)
        {
            unset($archivos[0]);
            unset($archivos[1]);
            
            $listaArchivos=array();
            
            foreach ($archivos as $key => $value) {
                $json=new stdClass();
                $json->nombre=$value;
                $json->fecha=date("d-m-Y H:i:s",filectime("./Meses/" . $value));
                $json->id=self::GenerarID($value);
                
                array_push($listaArchivos,$json);
            }
            $retorno=$listaArchivos;
        }

        return $retorno;
    }

    public static function TraerTodos(Request $request,Response $response,$args)
    {
        $listaArchivos=self::ObtenerNombresArchivos();
        $retorno=new stdClass();
        


        if(isset($listaArchivos))
        {
            $response=$response->withjson($listaArchivos,200);
        }
        else
        {
            $retorno->exito=false;
            $retorno->mensaje="Error,no se puedo traer la lista";
            $retorno->status=403;

            $response=$response->withjson($retorno,403);
        }

        return $response;
    }

    public static function BorrarUnArchivo($nombreArchivo)
    {
        $retorno=false;
        if(unlink("./Meses/".$nombreArchivo))
        {
            $retorno=true;
        }

        return $retorno;
    }


    public static function BorrarUno(Request $request,Response $response,$args)
    {
        $recibo=$request->getParsedBody();
         
        $nombreArchivo=$recibo["nombreArchivo"];
        $retorno=new stdClass();        

        if(self::BorrarUnArchivo($nombreArchivo))
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


}




