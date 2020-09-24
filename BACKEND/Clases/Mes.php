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

    public static function AgregarUno(Request $request,Response $response ,$args)
    {

    }

    public static function TraerTodos(Request $request,Response $response,$args)
    {
        $flag=false;
        $archivos=scandir("./Meses");
        
        
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
                
                array_push($listaArchivos,$json);
            }
            
           

            $response=$response->withjson($listaArchivos,200);
        }
        else
        {
            $response=$response->withjson(null,403);
        }

        return $response;
    }


}




