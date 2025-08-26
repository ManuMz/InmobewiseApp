<?php
header('Access-Control-Allow-Origin: *');

function conectar2(){
    $bd  = "inmobewise-db";
    $enlace =  mysqli_connect('localhost', 'arvispaceroot', 'MindFlyStudio2020PhpMyAdmin', $bd);

    if (!$enlace) {
        die("❌ No pudo conectarse: " . mysqli_connect_error());
    } else {
        echo "✅ Conexión exitosa a la base de datos: " . $bd;
    }

    mysqli_set_charset($enlace, 'utf8');
    mysqli_query($enlace, "SET lc_time_names = 'es_ES'");

    return $enlace;
}

// Llamar la función para probar la conexión
$con = conectar2();

// Cerrar la conexión después de la prueba
if ($con) {
    mysqli_close($con);
}
?>

