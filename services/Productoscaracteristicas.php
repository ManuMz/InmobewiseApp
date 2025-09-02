<?php header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');
include('Conexion.php');
$link = conectar();

//echo "data: ".$_POST['idProBodPre5'];

$id_probod = json_decode(stripslashes($_POST['idProBodPre']), true);  //la variable para el arreglo
$count = 0; //contador
$total = count($id_probod); //total
$productos=array(); //el array

//echo "numero: ".$total." --- ".$id_probod;


foreach ($id_probod as $row) { //para pasar los datos por arreglo se debe de ser con un foreach
    $count++; //contador
    //echo "row: ".$row;
    try {
     
    mysqli_next_result($link); 
    $query3=mysqli_query($link, "call ASAR_productosB3('$row')") or die(mysqli_errno());
    $number3=mysqli_num_rows($query3);
    if ($number3>0) {
       // echo "nomber99";
        while ($row3=mysqli_fetch_assoc($query3)) {
            mysqli_next_result($link);
            $caracteristicas=array();
            $idProbob=$row3['idProBodPre'];
         //   echo "id55".$idProbob;
            //$idProbob=159;
            
            mysqli_next_result($link);
           $query4=mysqli_query($link, "call ASAR_caracteristicas('$idProbob')") or die(mysqli_errno());
            $number4=mysqli_num_rows($query4);
            if ($number4>0) {
           //     echo "nomber88";
                while ($row4=mysqli_fetch_assoc($query4)) {
                    mysqli_next_result($link);
                    $imagenes=array();
                    $idCaracteristicas=$row4['idCaracteristica'];
                  //  echo "idcaract".$idCaracteristicas;
                    $query5=mysqli_query($link, "call ASAR_imagenes('$idCaracteristicas')") or die(mysqli_errno());
                    $number5=mysqli_num_rows($query5);
                    if ($number5) {
                        while ($row5=mysqli_fetch_assoc($query5)) {
                            $imagenes[]=array('idImagen' => $row5['idImagen'], 'nombreImagen'=>$row5['nombreImagen'], 'idCaracteristica'=>$row5['idCaracteristica']);
                        }
                        if ($imagenes==[]) {
                            # code...
                        } else {
                            $caracteristicas[]=array('idCaracteristica'=>$row4['idCaracteristica'], 'precio'=>$row4['precio'], 'tipoCaracteristica'=>$row4['tipoCaracteristica'], 'foto'=>$row4['foto'], 'idProBodPre'=>$row4['idProBodPre'], 'statusOferta'=>$row4['statusOferta'], 'existencia'=>$row4['existencia'], 'cantidad'=>$row4['cantidad'], 'codigo'=>$row4['codigo'], 'precioOferta'=>$row4['precioOferta'], 'codigoBarra'=>$row4['codigoBarra'], 'item'=>$row4['item'], 'itemID'=>$row4['itemID'], 'imagenes'=>$imagenes);
                        }
                    } else {
                        // $caracteristicas[]=array('idCaracteristica'=>$row4['idCaracteristica'], 'precio'=>$row4['precio'], 'tipoCaracteristica'=>$row4['tipoCaracteristica'], 'foto'=>$row4['foto'], 'idProBodPre'=>$row4['idProBodPre'], 'statusOferta'=>$row4['statusOferta'], 'existencia'=>$row4['existencia'], 'cantidad'=>$row4['cantidad'], 'codigo'=>$row4['codigo'], 'precioOferta'=>$row4['precioOferta'], 'imagenes'=>array('metodo'=>'0', 'msg'=>'No hay Imagenes'));
                    }
                }
                if ($caracteristicas==[]) {
                    # code...
                } else {
                    $productos[]=array('idProBodPre'=>$row3['idProBodPre'], 'cantidadMayoreo'=>$row3['cantidadMayoreo'], 'descripcion'=>$row3['descripcion'], 'descripcionLarga'=>$row3['descripcionProducto'], 'activos'=>$row3['activos'], 'alto'=>$row3['alto'], 'ancho'=>$row3['ancho'], 'largo'=>$row3['largo'],'idEmpresa'=>$row3['idEmpresa'], 'imagenEmpresa'=>$row3['imagenEmpresa'], 'Caracteristicas'=>$caracteristicas);
                }
            } else {
            }
                        
            // $productos[]=$row3;
        }
       
    } else {
  
    } //end procedimiento


    
  } catch (Exception  $e) {
    $productos[]=array('status'=>'0', 'msg'=>'Error: '.$e);
    header('Content-Type: application/json');
    echo json_encode($productos);
  }
}


header('Content-Type: application/json');
echo json_encode($productos);

?>