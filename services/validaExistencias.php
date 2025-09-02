<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');
include('Conexion.php');
$con = conectar();
$arregloProductos = json_decode(stripslashes($_POST['arregloProductos']), true);
$producto = array();
$count = 0;
$total = count($arregloProductos);
$existenciaH=0;
foreach ($arregloProductos as $row) {
    $count++;
    $codigo = $row["codigo"];
    $id_producto = $row["idBodPro"];
    $cantidad1 = $row["count"];
    $id_caracteristica = $row["id_caracteristica"];
    if ($codigo=="3") {
        $query = mysqli_query($con,"CALL ASAR_validaExistenciaPromocion('$id_caracteristica','$cantidad1')")or die(mysqli_error($con));
        $number = mysqli_num_rows($query);
        if ($number>0) {
            if ($count==$total) {
                while ($row2=mysqli_fetch_assoc($query)) {
                    if ($row2['TipoExistencia']==0) {
                        # Productos insuficientes
                        $producto[]=array('idProBodPre'=>$id_producto, 'existencias'=>$row2['existencias'], 'idPromocion'=>$row2['idPromocion']);
                        $existenciaH=1;
                        // echo "Existencia1";
                    } 
                    // echo "TipoExistencia: ".$existenciaH;
                    if ($existenciaH==0) {
                        $producto[]=array('metodo'=>'1', 'msg'=>'Si hay produtos');
                    }
                }
            } else {
                while ($row3=mysqli_fetch_assoc($query)) {
                    if ($row3['TipoExistencia']==0) {
                        # Productos insuficientes
                        $producto[]=array('idProBodPre'=>$id_producto, 'existencias'=>$row3['existencias'], 'idPromocion'=>$row3['idPromocion']);
                        $existenciaH=1;
                        // echo "Existencia2";
                    } 
                }
            }
            mysqli_next_result($con);
        } 
    } else {
        //$query = mysqli_query($con,"CALL ASAR_validaExistencias('$id_caracteristica','$cantidad1')")or die(mysqli_error($con));
        $query = mysqli_query($con,"CALL AR_OBTENER_LISTA_PRODUCTOS_STOCK_ALL('$id_caracteristica','$cantidad1')")or die(mysqli_error($con));

        $number = mysqli_num_rows($query);
        if ($number>0) {
            if ($count==$total) {
                while ($row2=mysqli_fetch_assoc($query)) {
                    if ($row2['TipoExistencia']==0) {
                        # Productos insuficientes
                        //$producto[]=array('idProBodPre'=>$id_producto, 'existencia'=>$row2['existencia'], 'idCaracteristica'=>$row2['idCaracteristica']);
                        $producto[]=array('producto'=>$row2['nombreProducto']);
                        //$producto[]=array('Producto: '=>$row2['nombreProducto'] );
                        $existenciaH=1;
                        // echo "Existencia1";
                    } 
                    // echo "TipoExistencia: ".$existenciaH;
                    if ($existenciaH==0) {
                        $producto[]=array('metodo'=>'1', 'msg'=>'Si hay produtos');
                    }
                }
            } else {
                while ($row3=mysqli_fetch_assoc($query)) {
                    if ($row3['TipoExistencia']==0) {
                        # Productos insuficientes
                        $producto[]=array('producto'=>$row3['nombreProducto']);
                        //$producto[]=array('idProBodPre'=>$id_producto, 'existencia'=>$row3['existencia'], 'idCaracteristica'=>$row3['idCaracteristica']);
                        //$producto[]=array('Producto: '=>$row3['nombreProducto'] );
                        $existenciaH=1;
                        // echo "Existencia2";
                    } 
                }
            }
            mysqli_next_result($con);
        } 
    }
}
echo json_encode($producto);
?>