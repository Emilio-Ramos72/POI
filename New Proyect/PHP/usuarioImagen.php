<?php
require_once 'classUsuario.php';
$_usuario = new Usuario;

//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($_POST['opc']==1){
       $name=$_POST['nombre'];
        $nick=$_POST['nickname'];
        $correo=$_POST['correo'];
        $password=$_POST['password'];
        
        $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_usuario->conexion,$file);

        $json = [
            "nombre" => $name,
            "nickname"=> $nick,
            "correo"=> $correo,
            "password"=> $password,
        ];

        $coso = json_encode($json);
        $jala = $_usuario->CrearUsuario($coso,$blob);
    }

    
    if($_POST['opc']==2)
        $jala = $_usuario->iniciarSesion($postbody);
    if($_POST['opc']==3)
        $jala = $_usuario->getPerfilUsuario();
    if($_POST['opc']==4)
        $jala = $_usuario->modificarUsuario($postbody);
   
    echo $jala;
?>