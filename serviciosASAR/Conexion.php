<?php header('Access-Control-Allow-Origin: *');
 ?>
<?php
//funcion que retornara la conexion de la base de datos
function conectar(){
  $bd  = "arvis_space";
  // $bd  = "arvis_spaceAmbpruebas";
  $enlace =  mysqli_connect('localhost', 'arvispaceroot', 'MindFlyStudio2020PhpMyAdmin', $bd);
  // $enlace =  mysqli_connect('arvis.mx', 'arvis', 'nZc4yQ)aXibB', $bd);
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
