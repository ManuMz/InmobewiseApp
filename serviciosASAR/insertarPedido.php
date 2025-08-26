<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');
date_default_timezone_set('America/Mexico_City');

  include('Conexion.php');
  $con = conectar();

  $FechaHoy = date('Y-m-d h:i:s');
  $arregloProductos = json_decode(stripslashes($_POST['arregloProductos']), true);
  $correoCliente = $_POST['correoCliente'];
  $telefono = $_POST['telefono'];
  $total          = $_POST['total'];
  $MetodoPag      = $_POST['MetodoPag'];
  $direccion      = $_POST['direccion'];
  $referencias = $_POST['referencias'];
  $idEmpresaApp = $_POST['idEmpresaApp'];
  $idBanco = $_POST['idBanco'];
  $nombreEntrega = $_POST['nombreEntrega'];

//   $emailUsuario   = $_POST['emailUsuario'];
  $result=array();
  $total2 = count($arregloProductos);
if (validaPedido($correoCliente, $telefono, $total, $MetodoPag, $direccion)==true) {
    // echo "Datos correcto";
    $query = mysqli_query($con,"CALL ASAR_insertarPedido('$correoCliente','$telefono','$FechaHoy','$total','$MetodoPag','$direccion', '$referencias', '$idEmpresaApp', '$idBanco')")or die(mysqli_error($con));
    if ($query) {
      $count = 0;
      foreach ($arregloProductos as $row) {
        $count++;
        $codigo = $row["codigo"];
        $id_producto = $row["idBodPro"];
        $cantidad1 = $row["count"];
        $cantidad2 = $row["CantidadPromocion"];
        $monto = $row["TotalProducto"];
        $total_cantidad = $row["totalPag"];
        $id_caracteristica = $row["id_caracteristica"];
          if ($codigo=="1") {
            insertarProducto($id_producto, $id_caracteristica, $monto, $cantidad1, $total_cantidad, $codigo, $correoCliente,$nombreEntrega, $con);
          } if ($codigo=="2") {
            insertarProducto($id_producto, $id_caracteristica, $monto, $cantidad2, $total_cantidad, $codigo, $correoCliente,$nombreEntrega, $con);
          } if($codigo=="3"){
               $cantidad = $row["count"];
               //$query = mysqli_query($con,"call ASAR_insertarDetallePedidoPaquete('$correoCliente', '$cantidad', '$id_producto', '$nombreEntrega')") or die(mysqli_errno($con));
               $query = mysqli_query($con,"call ASAR_insertarDetallePedidoPaquete('$correoCliente', '$cantidad', '$id_producto')") or die(mysqli_errno($con));
               $query2 = mysqli_query($con, "call ASAR_descontarExistencias('$id_caracteristica', '$cantidad', '$codigo')")or die(mysqli_error($conP));
          }
          if ($total2 == $count ) {
            echo json_encode($result[]=array('metodo'=>'1', 'msg'=>'Pedido realizado'));
          }
      }
    }else {
      echo json_encode($result[]=array('metodo'=>'0', 'msg'=>'Error al registrar el pedido'));
    }
}

  function insertarProducto($id_productoP, $id_caracteristicaP, $montoP, $cantidad1P, $total_cantidadP, $codigoP, $correoClienteP, $nombreEntregaP, $conP){
    // echo " id: ".$idProductoP." Cantidad: ".$cantidadP." monto: ".$montoP." Codigo: ".$codigoP." Correo: ".$correoP;
    $query = mysqli_query($conP,"CALL ASAR_insertarDetallePedido('$id_productoP', '$id_caracteristicaP', '$montoP', '$cantidad1P', '$total_cantidadP', '$codigoP', '$correoClienteP', '$nombreEntregaP')")or die(mysqli_error($conP));
    $query2 = mysqli_query($conP, "call ASAR_descontarExistencias('$id_caracteristicaP', '$cantidad1P', '$codigoP')")or die(mysqli_error($conP));
  }
  function validaPedido($correoClienteP, $telefonoP, $totalP, $MetodoPagP, $direccionP){
      if ($correoClienteP=="" || $correoClienteP==null) {
        $result[]=array('metodo'=>'0', 'msg'=>'Ingresar correo');
        echo json_encode($result);
        return false;
      } else {
        if ($telefonoP=="" || $telefonoP==null) {
          $result[]=array('metodo'=>'0', 'msg'=>'Ingresar telefono');
          echo json_encode($result);
          return false;
        } else {
          if ($totalP=="" || $totalP==null) {
            echo json_encode($result[]=array('metodo'=>'0', 'msg'=>'Ingresar total'));
            return false;
          } else {
            if ($MetodoPagP=="" || $MetodoPagP==null) {
              echo json_encode($result[]=array('metodo'=>'0', 'msg'=>'Ingresar metodo de pago'));
              return false;
            } else {
              if ($direccionP=="" || $direccionP==null) {
                echo json_encode($result[]=array('metodo'=>'0', 'msg'=>'Ingresar direccion'));
                return false;
              } else {
                  return true;
              }
            } 
          }
        }
      }
      
  }
?>