<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use Firebase\JWT\JWT;

require "./vendor/autoload.php";
require "./Clases/Dia.php";
require "./Clases/Mes.php";

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


$app->group("/dia",function(){

    $this->post("/agregar",\Dia::class . "::AgregarUno")->add(
                           \Dia::class . "::ValidarFechaYHora");
                           //validarQue exista nombre de archivo
    $this->get("/traerTodos/{nombreArchivo}",\Dia::class . "::TraerTodos");
    //mandar por medios que no sean argumentos
    //si el archvo esta vasio se muestra la atabla vacia y/o se lo indica con un mensaje
    $this->delete("/borrar",\Dia::class . "::BorrarUno");
    $this->put("/modificar",\Dia::class . "::ModificarUno")->add(
                            \Dia::class . "::ValidarFechaYHora");
});

$app->group("/mes",function(){

    $this->post("/agregar",\Mes::class . "::AgregarUno")->add(
                            \Mes::class . "::Existe");
    $this->get("/traerTodos",\Mes::class . "::TraerTodos");
    $this->delete("/borrar",\Mes::class . "::BorrarUno");
    $this->put("/modificar",\Mes::class . "::ModificarUno");//tiene que abrir el archivo seleccionado;
});

$app->run();












?>