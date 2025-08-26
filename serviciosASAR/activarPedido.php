<?php
session_start();
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
include('Conexion.php');
require_once 'PHPMailer/PHPMailerAutoload.php';
$link = conectar();
$idBanco = $_POST['idBanco'];
$pedidos=array();
$query = mysqli_query($link, "CALL ASAR_activarPedido('$idBanco')") or die(mysqli_errno($link));
if ($query) {
    // mysqli_next_result($link);
    $query2 = mysqli_query($link, "CALL ASAR_getInfoPedido('$idBanco')") or die(mysqli_errno($link));
    $numbre1 = mysqli_num_rows($query2);
    if ($numbre1>0) {
        $datosPedido;
        $correo= $row['correo'];
        $telefono = $row['telefono'];
        $direccion=$row['direccion'];
        // $detalleDireccion=$row['detalleDireccion'];
        // $total=$row['total'];
        // $metodoPago=$row['metodoPago'];
        while ($row=mysqli_fetch_assoc($query2)) {
            $SolicitudFactura="";
            if ($row['solicitudFactura']==0) {
                $SolicitudFactura="No";
            } else {
                $SolicitudFactura="Si";
            }
            
            $datosPedido="Correo: ".$row['correo']."<br />Telefono: ".$row['telefono']."<br />Direccion: ".$row['direccion']."<br />Detalle de direccion: ".$row['detalleDireccion']."<br />Total: ".$row['total']."<br />Metodo de pago: ".$row['metodoPago']."<br />Solicitud de factura: ".$SolicitudFactura."";
        }
        $email="info@arvis.mx";
        $nombre="Arvispace";
        $asunto="Compra";
        $cuerpo="Se realizo una compra <br /><br />
        ".$datosPedido."<br />
        Saludos!";
        function comprobar_email($email) {
            return (filter_var($email, FILTER_VALIDATE_EMAIL)) ? 1 : 0;
        }
        if (comprobar_email($email)) { 
            $mail = new PHPMailer();
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
            // Termina Adicion Nuevo
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls'; //Modificar
            $mail->Host = 'webmail.arvis.mx'; //Modificar
            $mail->Port = 587; //Modificar
    
            $mail->Username = "soporte@arvis.mx";//'edgar11e93@gmail.com'; //Modificar
            $mail->Password =  ")xj]w&cr;bf=";//Modificar
    
            $mail->setFrom('soporte@arvis.mx', 'Arvis'); //Modificar
            $mail->addAddress($email, $nombre);// A donde se envia el email
    
            $mail->Subject = $asunto;
            $mail->Body    = $cuerpo;
            $mail->IsHTML(true);
            if($mail->send()){
                // header('Content-Type: application/json');
                // //usuario registrado verificar su corrreo para la activacion de su cuenta
                // echo json_encode(
                //     array(
                //         'metodo'=>'1',
                //         'msg'=>'Usuario registrado verificar su correo para la activación de su cuenta.'
                //     ), JSON_UNESCAPED_UNICODE
                // );
            }else{
                // header('Content-Type: application/json');
                // // Error al enviar el correo
                // echo json_encode(
                //     array(
                //         'metodo'=>'1',
                //         'msg'=>'Error al enviar el correo.'
                //     )
                // );
            }
    } else {
        # code...
    }
    

    }else{
        // header('Content-Type: application/json');
        // echo json_encode(
        //     array(
        //         'metodo'=>'2',
        //         'msg'=>'Introducir el correo.'
        //     )
        // );
    }
    $pedidos[]= array(
        'metodo'=>'1',
        'msg'=> 'Pedido generado.'
    );
} else {
    $pedidos[]= array(
        'metodo'=>'0',
        'msg'=> 'Error del pedido.'
    );
}
header('Content-Type: application/json');
echo json_encode(($pedidos), JSON_UNESCAPED_UNICODE);
?>
