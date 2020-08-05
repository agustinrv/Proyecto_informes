<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use Firebase\JWT\JWT;

require "./vendor/autoload.php";
require "./Clases/Dia.php";
//require_once './Clases/AccesoDatos.php';
//require './Clases/mw.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


$app->group("/dia",function(){

    $this->post("/agregar",\Dia::class . "::AgregarUno")->add(
                           \Dia::class . "::ValidarFechaYHora");
    $this->get("/traerTodos",\Dia::class . "::TraerTodos");
    $this->delete("/borrar",\Dia::class . "::BorrarUno");
    $this->put("/modificar",\Dia::class . "::ModificarUno")->add(
                            \Dia::class . "::ValidarFechaYHora");
});

$app->run();












?>