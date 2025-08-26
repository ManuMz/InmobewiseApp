<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    error_reporting(E_ALL);
    include('Conexion.php');
    session_start();

    $link = conectar();
    $respuesta = array();
    $error = false;
    $message = "";
    try{

        $query = mysqli_query($link,"call consultarCajasEmpaquetado_pro()")or die(mysqli_errno($link));
        $number = mysqli_num_rows($query);
        if($number>0){
            $message ="Encontre algo! :D";
            $respuesta['success'] = true;
            while($row = mysqli_fetch_assoc($query)){
                $respuesta[] = $row;
            }

        }else{
            $error = true;
            $message = "No se encontraron las cajas";
            $respuesta['success'] = false;
        }



    }catch(Exception $e){
        $error = true;
	    $message = $e->getMessage();

    }
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    exit();

?>