<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=UTF-8');
	include('Conexion.php');
	$link = conectar();
	$correo = $_REQUEST['correo'];
    $password = md5($_REQUEST['password']);
    $query = mysqli_query($link, "CALL ASAR_validaActivacion('$correo')") or die(mysqli_errno($link));
    $number1 = mysqli_num_rows($query);
    if ($number1>0) {
        while($row = mysqli_fetch_assoc($query))
        {
            $activacion=$row['activacion'];
            if ($activacion==1) {
                mysqli_next_result($link);
                $usuario = array();

                mysqli_next_result($link);
                $queryActivation = mysqli_query($link, "call activarSessionUsuario('$correo','$password');") or die(mysqli_errno($link));//testing

                $Usuarios = mysqli_query($link,"CALL ASAR_login('$correo','$password')") or die(mysqli_errno());//produccion
                $number = mysqli_num_rows($Usuarios);
                if($number > 0) {
                    while($row2 = mysqli_fetch_assoc($Usuarios))
                    {
                        $usuario[]=$row2;
                    }
                } else
                {
                     //echo "Correo o contraseña incorrecta<br>";
                   $usuario[]=array(
                            'metodo'=>'0',
                            'msg'=> 'Correo o contraseña incorrecta.'
                        );
                }
            }else if($activacion==2){
                $usuario[]= array(
                    'metodo'=>'2',
                    'msg'=> 'La cuenta se encuentra suspendida.'
                );

            } else {
                $usuario[]= array(
                        'metodo'=>'0',
                        'msg'=> 'La cuenta no esta activa.'
                    );
            }
        }
    } else {
           $usuario[]= array(
                'metodo'=>'0',
                'msg'=> 'Correo o contraseña incorrecta.'
           );
    }
    header('Content-Type: application/json');
    echo json_encode(($usuario), JSON_UNESCAPED_UNICODE);
	function properText($str){
		$str = mb_convert_encoding($str, "HTML-ENTITIES", "UTF-8");
		$str = preg_replace('[a-zA-Z áéíóúÁÉÍÓÚñÑ.]+',htmlentities('${1}'),$str);
		return($str);
	}
?>
