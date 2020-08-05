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



}




