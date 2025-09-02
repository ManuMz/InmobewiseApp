<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include('Conexion.php');
$con = conectar();

function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);
        return substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
    }
}

// Capturar datos
$correo = $_POST['correo'] ?? null;
$telefono = $_POST["telefono"] ?? null;
$usuario = $_POST["usuario"] ?? null;
$contrasena = isset($_POST["password"]) ? md5($_POST["password"]) : null;
$nombreCompleto = $_POST["nombreCompleto"] ?? null;

if (!$correo || !$telefono || !$usuario || !$contrasena || !$nombreCompleto) {
    echo json_encode(array('status' => '0', 'msg' => 'Faltan datos obligatorios'));
    exit;
}

// Verificar si el usuario ya existe
$query2 = mysqli_query($con, "CALL consultarCorreoUsuario3('$correo','$telefono')");

$number1 = mysqli_num_rows($query2);

if ($number1 > 0) {  
    // Usuario ya existe
    echo json_encode(array('status' => '100', 'msg' => 'El usuario ya existe'));
} else {
    // Si el correo está vacío, se genera un GUID
    if (empty($correo)) {
        $correo = getGUID();
    }

    // Insertar en la segunda base de datos
    mysqli_next_result($con);
    $query2 = mysqli_query($con, "CALL AR_INSERTAR_USUARIO_ALL('$correo','$contrasena','$usuario','$nombreCompleto','$telefono')");

    if ($query2) { 
        echo json_encode(array(
            'status' => '1',
            'msg' => 'Usuario registrado correctamente',
            'correo' => $correo,
            'password' => $contrasena,
            'usuario' => $usuario,
            'nombreCompleto' => $nombreCompleto,
            'telefono' => $telefono
        ));
    } else {
        echo json_encode(array('status' => '0', 'msg' => 'Error al registrar'));
    }
}

// Cerrar conexión
$con->close();
?>
