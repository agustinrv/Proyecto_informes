<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoy</title>

     
   <!-- CSS only -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

  <!-- JS, Popper.js, and jQuery -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

  <!--para iconos-->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="dia.js"></script>

</head>

<header>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top"> <!--bg-dark-->

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
  
            <li class="dropdown dropdown">
              <a class="nav-link text-primary"   id="navbardrop" href="principal.html">
                Meses<b class="caret"></b>
              </a>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  
</header>
<!--rgb(247, 206, 203) rgb(219, 162, 96)-->


<body class="bg-info" >

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-4">
            <div class="container mt-5" >
                <h1 style="padding-top: 2%;">Informe</h1>
                <form action="" class="form-control " style="height: 1%; background-color: lightgrey;">

                  <div class="form-row form-group">
                      <div class="col-sm-2  col-form-label-sm mt-2 "><label for="dateFecha" class="h6">Fecha</label></div>
                      <div class="col-sm col-md input-group mb-2 mr-sm-2 mt-2">
                          <div class="input-group-text"><label for="dateFecha" class="fas fa-calendar-alt"></label></div>
                          <input type="date" id="dateFecha" class="form-control" required placeholder="Fecha">
                      </div>
                  </div>

                <div class="form-row form-group">
                  <div class="col-sm-2  col-form-label-sm mt-1"><label for="txtPublicaciones" class="h6">Public.</label></div>
                  <div class="col-sm input-group mb-2 mr-sm-2">
                    <label for="txtPublicaciones" class="fas fa-book-open input-group-text"></label>
                    <input type="number" id="txtPublicaciones" class="form-control" min="0" placeholder="Publicaciones">
                  </div>
                </div>

                <div class="form-row form-group">
                  <div class="col-sm-2   col-form-label-sm mt-1"><label for="txtVideos" class="h6">Videos</label></div>
                  <div class="col-sm input-group mb-2 mr-sm-2">
                    <label for="txtVideos" class="fas fa-video input-group-text"></label>
                    <input type="text" id="txtVideos" class="form-control" min="0" placeholder="Videos">
                 </div>  
                </div>

                <div class="form-row form-group">
                  <div class="col-sm-2   col-form-label-sm mt-1"><label for="txtHoras" class="h6">Horas</label></div>
                  <div class="col-sm input-group mb-2 mr-sm-2">
                    <label for="txtHoras" class="fas fa-clock input-group-text"></label>
                    <input type="time" id="txtHoras" value="00:00" class="form-control " placeholder="Horas">
                 </div>  
                </div>                

                <div class="form-row  form-group">
                  <div class="col-sm-2   col-form-label-sm mt-1 "><label for="txtRevisitas" class="h6">Revisitas</label></div>
                  <div class="col-sm input-group mb-2 mr-sm-2">
                    <label for="txtRevisitas" class="fas fa-user-friends input-group-text"></label>
                    <input type="number" id="txtRevisitas" class="form-control" min="0" placeholder="Revisitas">
                  </div>
                  
                </div>

                <div class="form-row form-group">
                  <div class="col-sm-2   col-form-label-sm mt-1 "><label for="txtEstudios" class="h6">Estudios</label></div>
                    <div class="col-sm input-group mb-2 mr-sm-2">
                      <label for="txtEstudios" class="fas fa-user-graduate input-group-text "></label>
                      <input type="number" id="txtEstudios" class="form-control" min="0" placeholder="Estudios">
                    </div>
                    
                </div>

                <div class="form-row form-group">
                    <div class="col"><input type="button" value="Agregar" class="btn btn-success btn-block"  id="btnAgregar"  onclick="Agregar()"></div>
                    <div class="col"><input type="reset" value="Limpiar" class="btn btn-warning btn-block"></div>
                </div>
      
            </form>
            <div id="divAlert" style="padding-top: 3%;"></div>
            
          </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg col-xl-8 ">
          <div class="container mt-5">
          <button class="btn btn-danger" onclick="pruebaPHP()">Hola</button>
    
            <div id="tablaMes" >

        


            <?php

                $fila=2;
                $total = new stdClass();
                $total->dias=10;
                $element=new stdClass();
                $element->fecha=3;
                $element->videos=3;
                $element->horas=3;
                $element->revisitas=3;
                $element->estudios=3;
                $element->publicaciones=150;
                $element->id=3;       

?>
                  
                <h1 style="padding-top: 2%;">'+ $archivo +'</h1> ';
                <div class="table-responsive">
                <table class="table table-sm table-dark table-hover">
                <tr>
                    <th></th><th>Nº</th><th class="text-center">Fecha</th><th class="text-center">Publicaciones</th><th class="text-center">Videos</th><th class="text-center">Horas</th>
                    <th class="text-center">Revisitas</th><th class="text-center">Estudios</th><th>Modificar</th><th>Eliminar</th>
                </tr>

                <tr onclick="SeleccionarFilaPrimary(<?php echo $fila ?> ,<?php echo $total->dias ?>)" id="fila-<?php echo $fila ?>">
                <td></td>
                <td class="text-center"><?php echo $fila ?></td><td class="text-center"><?php echo $element->fecha ?></td><td class="text-center"><?php echo $element->publicaciones ?></td>
                <td class="text-center"><?php echo $element->videos ?></td>
                <td class="text-center"><?php echo $element->horas ?></td>
                <td class="text-center"><?php echo $element->revisitas ?></td>
                <td class="text-center"><?php echo $element->estudios?></td>
                <td><input type='button' value='Modificar' class='btn btn-warning' onclick=<?php echo 'ArmarModificar('.json_encode($element).','. $fila .')'?> ></td>
                <td><input type="button" value="Eliminar" class="btn btn-danger" onclick=<?php echo 'Eliminar('.$element->id . ",".$fila.')'?> ></td></tr>


                <!--tr><td>Total:</td><td class="text-left" colspan="2">'+total.dias+' Dias</td><td class="text-center">'+total.publicaciones+'</td>
                <td class="text-center">'+total.videos+'</td><td class="text-center">'+total.horas+'</td>';
                <td class="text-center">'+total.revisitas+'</td><td class="text-center">'+total.estudios+'</td></tr></table></div>
                <input type="button" value="Generar Informe" class="btn btn-primary" id="btnInforme">
                <div id="divInforme" class="mt-2"></div-->



            </div>
           
          </div>
        </div>
      
      </div>

    </div>


    
  
  
</body>
</html>





