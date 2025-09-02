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

    //Inicializar variable OUT en MySQL
    $con ->query("SET @existEmail = 0");

    //validar si el correo Google/Gmail ya se encuentra registrado
    $stmt = $con->prepare("CALL sp_CheckEmailUser(?, @existEmail)"); //Preparar y ejecutar el procedimiento almacenado
    $stmt->bind_param("s", $email);//ingresa el email como parametro para el sp
    $stmt->execute();
    $stmt->close();
    
    //Obtener resultado
    $result = $con->query("SELECT @existEmail AS existEmail");
    $row = $result->fetch_assoc(); //1 indica que el correo ya existe, 0 indica lo contrario
    
    if((int)$row['existEmail']==1){ //Si existe el correo Google, se actualiza el registro, agregando UID
        UpdateUserToGoggleUser($con, $UID);
    }
    else{ //se agrega el correo, nombre y UID del usuario Google
        AddGoogleUser($con, $email, $displayName, $UID);
    }

    echo json_encode([
        'success'=> true,
        'existe' => (int )$row['existEmail']
    ]);

    $con->close();

}

catch(Exception $e){
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}


function AddGoogleUser(mysqli $con,string $email, string $displayname, string $UID){
    $stmt=$con->prepare("CALL sp_AddGoogleUser(?)");
    $stmt->bind_param("sss",$UID, $displayName,$email);


    //Obtener resultado
    $result = $stmt->get_result();
}

function UpdateUserToGoggleUser(mysqli $con, string $UID){

}


?>