<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/html; charset=UTF-8');
    include('Conexion.php');
    session_start();
    // $idAdmin=$_POST['idAdmin'];
    $idEmpresaApp=$_POST['idEmpresaApp'];
    $link = conectar();
    $colores = array();
    $query = mysqli_query($link,"CALL ASAR_getColoresApp('$idEmpresaApp')") or die(mysqli_errno());
    $number = mysqli_num_rows($query);
    if ($number>0) {
        while ($row = mysqli_fetch_assoc($query)) {
            $colores=$row;
        }
    } else {
        $colores=array('status'=>'0', 'msg'=>'No hay colores');
    }
    header('Content-Type: application/json');
    echo json_encode($colores);
?>