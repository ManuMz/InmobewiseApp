<?php header('Access-Control-Allow-Origin: *');
 ?>
<?php
//funcion que retornara la conexion de la base de datos
function conectar(){
  //Base de datos produccion
  $bd  = "arvis_space";

  //Base de datos testing
  //$bd  = "arvis_spaceAmbpruebas"; 
  
  //Enlace anterior
  //$enlace =  mysqli_connect('localhost', 'arvispaceroot', 'MindFlyStudio2020PhpMyAdmin', $bd);
  
  //Nuevo enlace, modificado: 11/08/2025
  $enlace = mysqli_connect('localhost', 'user_mindfly', 'mindfly_2025', $bd);
  
  $tildes = mysqli_query($enlace,"SET NAMES 'utf8'");
  mysqli_set_charset($enlace,'utf8');
  $esp = mysqli_query($enlace,"SET lc_time_names = 'es_ES'" );
      if (!$enlace) {
        die('No pudo conectarse: ' . mysql_error());
      } else{

      }
        mysqli_select_db($enlace,$bd);

      return $enlace;
	  mysqli_close($enlace);
	  #Ahora liberamos el resultado
mysqli_free_result($enlace);
}
?>
