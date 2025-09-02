<?php
header("Access-Control-Allow-Origin: *");
include('Conexion.php');
$link = conectar();

$correo=$_POST['correo'];
$name = $_POST['displayName'];
$resultado = array();


//$correo="2461291741";
//$correo="2461550696";
//$name = "usuario telefono";

$query2 = mysqli_query($link, "call consultarCorreoUsuario2('$correo')") ;
$number1=mysqli_num_rows($query2);
if ($number1>0) {
    while($row1 = mysqli_fetch_assoc($query2))
    {
        $resultado[]=$row1;
    }
} else {

    mysqli_next_result($link);
    //$resultado[]=array('status'=>'0', 'msg'=>'error al registrar');
    $query3 = mysqli_query($link, "call insertarUsuarioLoginAR2('$correo','$name')") ;

    if ($query3) {
        $query4 = mysqli_query($link, "call consultarCorreoUsuario2('$correo')") ;

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


        /*$query3 = mysqli_query($link, "call consultarCorreoUsuario('$correo')") or die(mysqli_errno($link));
        

        $number2=mysqli_num_rows($query3);
        if ($number2>0) {
            while($row2 = mysqli_fetch_assoc($query3))
            {
                $resultado[]=$row2;
            }
        }*/
}
header('Content-Type: application/json');
echo json_encode($resultado);
?>