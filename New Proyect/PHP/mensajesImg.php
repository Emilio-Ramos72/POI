<?php
require_once 'classMensajes.php';
$_mensaje = new Mensajes;

//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($_POST['opc']==1){
        $mensaje=$_POST['mensaje'];
        $id=$_POST['id'];
        $valorSlider=$_POST['valorSlider'];
        
        
        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_mensaje->conexion,$file);

        $json = [
            "mensaje" => $mensaje,
            "id"=> $id,
            "valorSlider"=> $valorSlider
        ];

        $coso = json_encode($json);
        $jala = $_mensaje->CrearMsgImagen($coso,$blob);
    }

    
    
   
    echo $jala;
?>