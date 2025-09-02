<?php
header('Access-Control-Allow-Origin: *');

try{
    //conexion a la BD
    include('Conexion.php');
    $con = conectar();
    if ($con->connect_error) {
        throw new Exception("Error de conexión: " . $con->connect_error);
    }

    // Validación de campos
    if (!isset($_POST['email'], $_POST['displayName'], $_POST['UID'])) {
        throw new Exception("Faltan parámetros obligatorios");
    }
    
    $email =$_POST['email'];
    $displayName =$_POST['displayName'];
    $UID =$_POST['UID'];

    //validar si el correo Google/Gmail ya se encuentra registrado
    $stmt = $con->prepare("CALL sp_CheckEmailUser(?)"); //Preparar y ejecutar el procedimiento almacenado
    $stmt->bind_param("s", $email);//ingresa el email como parametro para el sp
    $stmt->execute();
    
    //Obtener resultado
    $result = $stmt->get_result();
    $existEmailUser=$result->fetch_assoc(); //1 indica que el correo ya existe, 0 indica lo contrario

    echo json_encode([
        'success'=> true,
        'existe' => isset($existEmailUser['existe']) ? (int)$existEmailUser['existe'] : 0
    ]);

    $stmt->close();
    $con->close();

}

catch(Exception $e){
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);

}
?>