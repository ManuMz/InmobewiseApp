<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include('Conexion.php');
session_start();
$conn= conectar();
//$respuesta = array();

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

// Realizar la subconsulta para obtener el valor de idPedido
$subquery = "SELECT idPedido FROM Pedidos ORDER BY idPedido DESC LIMIT 1";
$result = $conn->query($subquery);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $idPedido = $row["idPedido"];
} else {
    // En caso de que la subconsulta no devuelva resultados, asigna un valor por defecto o muestra un mensaje de error
    $idPedido = 0; // Puedes cambiar esto según tus necesidades
}

///Obtener los demás datos
$idRate = $_POST['idRate'];
$myShipmentReference = $_POST['myShipmentReference'];
$requestPickup = isset($_POST['requestPickup']) ? 1 : 0;
$pickupDate = $_POST['pickupDate'];
$insurance = isset($_POST['insurance']) ? 1 : 0;
$description = $_POST['description'];
$contentValue = $_POST['contentValue'];
$weight = $_POST['weight'];
$length = $_POST['length'];
$height = $_POST['height'];
$width = $_POST['width'];
$origin_company = $_POST['origin_company']; 
$origin_rfc = $_POST['origin_rfc']; 
$origin_firstName = $_POST['origin_firstName']; 
$origin_lastName = $_POST['origin_lastName']; 
$origin_email = $_POST['origin_email']; 
$origin_phone = $_POST['origin_phone']; 
$origin_street = $_POST['origin_street']; 
$origin_number = $_POST['origin_number']; 
$origin_intNumber = $_POST['origin_intNumber'];
$origin_suburb = $_POST['origin_suburb']; 
$origin_crossStreet = $_POST['origin_crossStreet']; 
$origin_zipCode = $_POST['origin_zipCode']; 
$origin_reference = $_POST['origin_reference']; 
$origin_observations = $_POST['origin_observations']; 
$destination_company = $_POST['destination_company']; 
$destination_rfc = $_POST['destination_rfc']; 
$destination_firstName = $_POST['destination_firstName']; 
$destination_lastName = $_POST['destination_lastName']; 
$destination_email = $_POST['destination_email']; 
$destination_phone = $_POST['destination_phone']; 
$destination_street = $_POST['destination_street']; 
$destination_number = $_POST['destination_number']; 
$destination_intNumber = $_POST['destination_intNumber']; 
$destination_suburb = $_POST['destination_suburb']; 
$destination_crossStreet = $_POST['destination_crossStreet']; 
$destination_zipCode = $_POST['destination_zipCode']; 
$destination_reference = $_POST['destination_reference']; 
$destination_observations = $_POST['destination_observations'];
$guide = $_POST['guide'];
$url = $_POST['url'];
$tracker = $_POST['tracker'];
$idOrder = $_POST['idOrder'];
$deliveryType = $_POST['deliveryType'];
$deliveryDays = $_POST['deliveryDays'];
$nombreCaja = $_POST['nombreCaja'];

$respuesta = array();

// Consulta SQL para insertar los datos en la tabla

$sql = "INSERT INTO shipment (idPedido, idRate, myShipmentReference, requestPickup, pickupDate, insurance, description, contentValue, weight, length, height, width, origin_company, origin_rfc, origin_firstName, origin_lastName, origin_email, origin_phone, origin_street, origin_number, origin_intNumber, origin_suburb, origin_crossStreet, origin_zipCode, origin_reference, origin_observations, destination_company, destination_rfc, destination_firstName, destination_lastName, destination_email, destination_phone, destination_street, destination_number, destination_intNumber, destination_suburb, destination_crossStreet, destination_zipCode, destination_reference, destination_observations, guide, url, tracker, idOrder, deliveryType, deliveryDays,nombreCaja)
        VALUES ('$idPedido', '$idRate', '$myShipmentReference', '$requestPickup', '$pickupDate', '$insurance', '$description', '$contentValue', '$weight', '$length', '$height', '$width', '$origin_company', '$origin_rfc', '$origin_firstName', '$origin_lastName', '$origin_email', '$origin_phone', '$origin_street', '$origin_number', '$origin_intNumber', '$origin_suburb', '$origin_crossStreet', '$origin_zipCode', '$origin_reference', '$origin_observations', '$destination_company', '$destination_rfc', '$destination_firstName', '$destination_lastName', '$destination_email', '$destination_phone', '$destination_street', '$destination_number', '$destination_intNumber', '$destination_suburb', '$destination_crossStreet', '$destination_zipCode', '$destination_reference', '$destination_observations', '$guide', '$url', '$tracker', '$idOrder', '$deliveryType', '$deliveryDays','$nombreCaja')";

//ORIGINAL
// if(mysqli_query($conn, $sql)){
//     $respuesta[]=array('status'=>'1', 'msg'=>'se ha registrado correctamente');
// }
// else {
//   // echo "no se ejecuto el servicio";
//   $respuesta[] = array('status' => '0', 'msg' => 'Error al registrar: ' . mysqli_error($conn));
// }
//AQUI TERMINA EL ORIGINAL

//NUEVO lo comente para poner ya con la url
// if (mysqli_query($conn, $sql)) {
//     // Inserción exitosa en shipment, ahora insertar en DetallePedido
//     $updateSql = "UPDATE DetallePedido 
//                   SET numeroReferencia = '$idRate' 
//                   WHERE idPedido = '$idPedido'";
    
//     if (mysqli_query($conn, $updateSql)) {
//         $respuesta[] = array('status' => '1', 'msg' => 'Datos registrados correctamente en ambas tablas');
//     } else {
//         $respuesta[] = array('status' => '0', 'msg' => 'Error al actualizar DetallePedido: ' . mysqli_error($conn));
//     }
// } else {
//     $respuesta[] = array('status' => '0', 'msg' => 'Error al registrar en shipment: ' . mysqli_error($conn));
// } //AQUI TERMINA EL NUEVO
if (mysqli_query($conn, $sql)) {
    // Determinar el valor de url con un switch
    $nombreEntregaQuery = "SELECT nombreEntrega FROM DetallePedido WHERE idPedido = '$idPedido'";
    $nombreEntregaResult = $conn->query($nombreEntregaQuery);

    if ($nombreEntregaResult->num_rows > 0) {
        $nombreEntregaRow = $nombreEntregaResult->fetch_assoc();
        $nombreEntrega = $nombreEntregaRow['nombreEntrega'];

        switch ($nombreEntrega) {
            case 'ESTAFETA':
                $url = 'https://www.estafeta.com/rastrear-envio';
                break;
            case 'DHL':
                $url = 'https://www.dhl.com/mx-es/home/rastreo.html';
                break;
            case 'AMPM':
                $url = 'https://www.grupoampm.com/rastreador/';
                break;
            default:
                $url = null;
                break;
        }

        // Actualizar DetallePedido con numeroReferencia y url
        $updateSql = "UPDATE DetallePedido 
                      SET numeroReferencia = '$idRate', url = '$url' 
                      WHERE idPedido = '$idPedido'";

        if (mysqli_query($conn, $updateSql)) {
            $respuesta[] = array('status' => '1', 'msg' => 'Datos registrados correctamente en ambas tablas con url');
        } else {
            $respuesta[] = array('status' => '0', 'msg' => 'Error al actualizar DetallePedido: ' . mysqli_error($conn));
        }
    } else {
        $respuesta[] = array('status' => '0', 'msg' => 'No se encontró el registro en DetallePedido para determinar el nombreEntrega');
    }
} else {
    $respuesta[] = array('status' => '0', 'msg' => 'Error al registrar en shipment: ' . mysqli_error($conn));
}

/*
// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error al insertar datos: " . $conn->error;
}*/

// Cerrar la conexión
header('Content-Type: application/json');
echo json_encode($respuesta);
$conn->close();
?>
