<?php header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');
include('Conexion.php');
$cp=$_POST['cp'];
$link = conectar();
$asentamientoEstado = array();
if ($cp!=12345) {
    $query = mysqli_query($link,"CALL ASAR_cpAsentamientoEstado('$cp')") or die(mysqli_errno());
    $number = mysqli_num_rows($query);
    if($number > 0)
    {
        while($row = mysqli_fetch_assoc($query))
        {
            $asentamientoEstado[]=$row;
        }
    }else{
        $asentamientoEstado[]=array('metodo'=>'0', 'msg'=>'No hay datos');
    }
}
    
    header('Content-Type: application/json');
    echo json_encode($asentamientoEstado);

?>