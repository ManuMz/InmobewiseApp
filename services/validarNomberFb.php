<?php
header("Access-Control-Allow-Origin: *");
include('Conexion.php');
$link = conectar();

$nombrefb=$_POST['nombrefb'];
$idfb = $_POST['idfb'];
$namedisplay = $_POST['displayName'];
$resultado = array();

$query2 = mysqli_query($link, "call consultarCorreoUsuario('$namedisplay')") ;
$number1=mysqli_num_rows($query2);
if ($number1>0) {
    while($row1 = mysqli_fetch_assoc($query2))
    {
        $resultado[]=$row1;
    }
    //$resultado[]=array('status'=>'1', 'msg'=>'existe el usuario');

} else {

    //$resultado[]=array('status'=>'10', 'msg'=>'no existe el usuario');
    //hayq ue registrar a el usuario
    mysqli_next_result($link);
    $query3 = mysqli_query($link, "call insertarUsuarioLoginAR2('$nombrefb','$nombrefb')") ;

    if ($query3) {
        $query4 = mysqli_query($link, "call consultarCorreoUsuario2('$nombrefb')") ;

        $number2=mysqli_num_rows($query4);
        if ($number2>0) {
            while($row2 = mysqli_fetch_assoc($query4))
            {
                $resultado[]=$row2;
            }
        }
    } else {
        $resultado[]=array('status'=>'1', 'msg'=>'error al registrar');
    }


}

header('Content-Type: application/json');
echo json_encode($resultado);


?>