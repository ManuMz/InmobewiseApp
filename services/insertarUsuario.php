<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

    include('Conexion.php');
    $con = conectar();
   
 // $correo ="loredopinedajohanpablo@gmai.com";
  //  $contrasena ="122132";
  //  $usuario = "0223823";
  //  $nombreCompleto ="pwowewwe";
  //  $telefono="priwehw";

  function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        //$uuid =chr(123)// "{"
            $uuid = substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
            //.chr(125);// "}"
        return $uuid;
    }
  }

$correo = $_POST['correo'];
$telefono=$_POST["telefono"];

$query2 = mysqli_query($con, "call consultarCorreoUsuario3('$correo','$telefono')");

$number1=mysqli_num_rows($query2);
  
if ($number1>0) 
{  //echo "el usuario ya existe";
 //////ya existe el usuario
 $respuesta[]=array('status'=>'100', 'msg'=>'El usuario ya existe');                                                               
                                                          
}
else
{//no existe el usuario, hay que registrarlo
    //echo "el usuario no existe";
    
   
    if($correo=="" || $correo==null){
        $correo=$GUID = getGUID();
    }else{
        $correo = $_POST['correo'];
    }

     
    $correo = $_POST['correo'];
     $contrasena = md5($_POST['password']);
     $usuario = $_POST["usuario"];
     $nombreCompleto =$_POST["nombreCompleto"];
     $telefono=$_POST["telefono"];
  
      /*
     $correo ="loredopinedajohanpablo@gmai.com";
     $contrasena = md5("123456");
     $usuario = "usuario001";
     $nombreCompleto ="nombre0001";
     $telefono="1231231231";
       */

  
     $respuesta = array();
  
     mysqli_next_result($con);
     //echo "paso";
      $query2 = mysqli_query($con,"call AR_INSERTAR_USUARIO_ALL('$correo','$contrasena','$usuario','$nombreCompleto','$telefono')");
      // echo "prueba1";
      // echo "query2: ".$query2;
  
      if ($query2) { 
        $respuesta[]=array('status'=>'1', 'msg'=>'usuario se ha registrado correctamente','correo'=>$correo,'password'=>$contrasena,'usuario'=>$usuario,'nombreCompleto'=>$nombreCompleto,'telefono'=>$telefono);
      }
      else {
        // echo "no se ejecuto el servicio";
        $respuesta[]=array('status'=>'0', 'msg'=>'error al registrar');
      }
}




    header('Content-Type: application/json');
    echo json_encode($respuesta);

    //error_reporting(E_ERROR | E_WARNING | E_PARSE);
    /*include('Conexion.php');
    $link = conectar();

    function getGUID(){
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            //$uuid =chr(123)// "{"
                $uuid = substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12);
                //.chr(125);// "}"
            return $uuid;
        }
    }

    $correo = $_POST['correo'];
    if($correo=="" || $correo==null){
        $correo=$GUID = getGUID();
    }else{
        $correo = $_POST['correo'];
    }
    
    $password = md5($_POST['password']);
    $usuario = $_POST['usuario'];
    $nombreCompleto = $_POST['nombreCompleto'];
    $telefono = $_POST['telefono'];
    $resultado=array();

    //mysqli_next_result($link);
    $query2 = mysqli_query($link,"call ASAR_insertarUsuario('$correo', '$password', '$usuario', '$nombreCompleto', '$telefono')")  or die(mysqli_errno($link));
    echo "paso: ";
    echo "correo: ".$correo." password: ".$password." usuario: ".$usuario." nombreCompleto:".$nombreCompleto." telefono: ".$telefono;

    if ($query2) {
        $resultado[]=array('status'=>'1', 'msg'=>'usuario se ha registrado correctamente','correo'=>$correo,'password'=>$password,'usuario'=>$usuario,'nombreCompleto'=>$nombreCompleto,'telefono'=>$telefono);
        
    } else {
        $resultado[]=array('status'=>'1', 'msg'=>'error al registrar');
    }

    header('Content-Type: application/json');
    echo json_encode($resultado);*/
?>