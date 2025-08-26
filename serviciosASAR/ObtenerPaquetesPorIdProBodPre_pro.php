<?php header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');
include('Conexion.php');
$link = conectar();


$id_probod = json_decode(stripslashes($_POST['idProBodPre']), true);  //la variable para el arreglo
$count = 0; //contador
$total = count($id_probod); //total
$productos=array(); //el array

foreach ($id_probod as $row) { //para pasar los datos por arreglo se debe de ser con un foreach
    $count++; //contador
    try {
      mysqli_next_result($link); 
      $query=mysqli_query($link, "call ObtenerPaquetesPorIdProBodPre_pro('$row')") or die(mysqli_errno($link));
      $number=mysqli_num_rows($query);
      if ($number) {
          while ($data=mysqli_fetch_assoc($query)) {
            $productos[]=array('idProBodPre' => $data['idProBodPre'], 'description' => $data['description'], 'contentValue' => $data['contentValue'],'weight' => $data['weight'],'length' => $data['length'],'height' => $data['height'],'width' => $data['width']);
        }
      }


    
  } catch (Exception  $e) {
    $productos[]=array('status'=>'0', 'msg'=>'Error: '.$e);
    header('Content-Type: application/json');
    echo json_encode($productos);
  }
}


header('Content-Type: application/json');
echo json_encode($productos);

?>