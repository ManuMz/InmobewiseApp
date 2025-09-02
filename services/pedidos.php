<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=UTF-8');
header('Content-Type: application/json');
	include('Conexion.php');//produccion
	$link = conectar();
    $correo = $_REQUEST['correo'];
    $idEmpresaApp = $_REQUEST['idEmpresaApp'];
    $query = mysqli_query($link, "CALL obtenerPedidosARVIS('$correo', '$idEmpresaApp')") or die(mysqli_errno($link));
    $number1 = mysqli_num_rows($query);
    $pedidos = array();
    if ($number1>0) {
        while($row = mysqli_fetch_assoc($query))
        {
            $bodegas=array();
            $idPedido=$row['idPedido'];
            mysqli_next_result($link);
            $query1 = mysqli_query($link,"CALL ASAR_bodegaProductosPedido('$idPedido')") or die(mysqli_errno());
            $number0 = mysqli_num_rows($query1);
            if ($number0>0) {
                while ($row1=mysqli_fetch_assoc($query1)) {
                    $idBodega=$row1['idBodega'];
                    mysqli_next_result($link);
                    $productos = array();
                    $query2 = mysqli_query($link,"CALL ASAR_pedidoProductos('$idPedido', '$idBodega')") or die(mysqli_errno());
                    $number2 = mysqli_num_rows($query2);
                    if($number2 > 0) {
                        while($row2 = mysqli_fetch_assoc($query2))
                        {
                            $imagenes=array();
                            $idCaracteristica=$row2['idCaracteristica'];
                            mysqli_next_result($link);
                            $query3 = mysqli_query($link, "CALL ASAR_imagenes('$idCaracteristica')") or die(mysqli_errno());
                            $number3 = mysqli_num_rows($query3);
                            if ($number3>0) {
                                while ($row3=mysqli_fetch_assoc($query3)) {
                                    $imagenes[]=array('idImagen'=>$row3['idImagen'], 'nombreImagen'=>$row3['nombreImagen']);
                                }
                                $productos[]=array('idDetallePedido'=>$row2['idDetallePedido'], 'idPedido'=>$row2['idPedido'], 'fechaEntrega'=>$row2['fechaEntrega'], 'total'=>$row2['total'], 'cantidad'=>$row2['cantidad'], 'totalCantidad'=>$row2['totalCantidad'], 'codigo'=>$row2['codigo'], 'estatus'=>$row2['estatus'], 'nombreEntrega'=>$row2['nombreEntrega'], 'numeroReferencia'=>$row2['numeroReferencia'], 'url'=>$row2['url'], 'activacionSeguimiento'=>$row2['activacionSeguimiento'], 'idCaracteristica'=>$row2['idCaracteristica'], 'tipoCaracteristica'=>$row2['tipoCaracteristica'], 'foto'=>$row2['foto'], 'idProBodPre'=>$row2['idProBodPre'], 'descripcion'=>$row2['descripcion'], 'codigoBarra'=>$row2['codigoBarra'],'codigoQR'=>$row2['codigoQR'],'nombreEmpresa'=>$row2['nombreEmpresa'], 'fotoEmpresa'=>$row2['fotoEmpresa'], 'imagnes'=>$imagenes);
                            } else {
                                $productos[]=array('idDetallePedido'=>$row2['idDetallePedido'], 'idPedido'=>$row2['idPedido'], 'fechaEntrega'=>$row2['fechaEntrega'], 'total'=>$row2['total'], 'cantidad'=>$row2['cantidad'], 'totalCantidad'=>$row2['totalCantidad'], 'codigo'=>$row2['codigo'], 'estatus'=>$row2['estatus'], 'nombreEntrega'=>$row2['nombreEntrega'], 'numeroReferencia'=>$row2['numeroReferencia'], 'url'=>$row2['url'], 'activacionSeguimiento'=>$row2['activacionSeguimiento'], 'idCaracteristica'=>$row2['idCaracteristica'], 'tipoCaracteristica'=>$row2['tipoCaracteristica'], 'foto'=>$row2['foto'], 'idProBodPre'=>$row2['idProBodPre'], 'descripcion'=>$row2['descripcion'], 'codigoBarra'=>$row2['codigoBarra'],'codigoQR'=>$row2['codigoQR'],'nombreEmpresa'=>$row2['nombreEmpresa'], 'fotoEmpresa'=>$row2['fotoEmpresa'], 'imagnes'=>array('metodo'=>'0', 'msg'=>'No hay imagenes'));
                            }
                        }
                        $bodegas[]=array('idBodega'=>$row1['idBodega'], 'nombreBodega'=>$row1['nombreBodega'], 'Productos'=>$productos);
                    } else{
                        $bodegas[]=array('idBodega'=>$row1['idBodega'], 'nombreBodega'=>$row1['nombreBodega'], 'Productos'=>array('metodo'=>'0', 'msg'=>'No hay productos'));
                        //echo "Correo o contraseña incorrecta<br>";
                    }
                }
                $pedidos[]=array('idPedido'=>$row['idPedido'], 'correo'=>$row['correo'], 'telefono'=>$row['telefono'], 'fechaHoraPedido'=>$row['fechaHoraPedido'], 'estatus'=>$row['estatus'], 'total'=>$row['total'], 'metodoPago'=>$row['metodoPago'], 'solicitudFactura'=>$row['solicitudFactura'], 'direccion'=>$row['direccion'], 'detalleDireccion'=>$row['detalleDireccion'], 'Bodegas'=>$bodegas);
            } else {
                $pedidos[]=array('idPedido'=>$row['idPedido'], 'correo'=>$row['correo'], 'telefono'=>$row['telefono'], 'fechaHoraPedido'=>$row['fechaHoraPedido'], 'estatus'=>$row['estatus'], 'total'=>$row['total'], 'metodoPago'=>$row['metodoPago'], 'solicitudFactura'=>$row['solicitudFactura'], 'direccion'=>$row['direccion'], 'detalleDireccion'=>$row['detalleDireccion'], 'Bodegas'=>array('metodo'=>'0', 'msg'=>'No hay bodega'));
                # code...
            }
            
        }
    } else {
           $pedidos[]= array(
                'metodo'=>'0',
                'msg'=> 'No hay pedidos.'
           );
    }
    echo json_encode(($pedidos), JSON_UNESCAPED_UNICODE);
?>
