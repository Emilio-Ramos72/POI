<?php
require_once 'classUsuario.php';
$_usuario = new Usuario;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);
    
    if($datos["opc"]==2){
        $jala = $_usuario->iniciarSesion($postbody);
        echo $jala;
    }
    if($datos["opc"]==3){
        header('Content-Type: application/json');
        $jala = $_usuario->getPerfilUsuario();
        echo json_encode($jala);
    }
    if($datos["opc"]==4){
        $jala = $_usuario->modificarUsuario($postbody);
        echo $jala;
    }
    if($datos["opc"]==5){
        header('Content-Type: application/json');
        $jala = $_usuario->getFilterUser($postbody);
        echo $jala;
    }

    //Actividad
    if($datos["opc"]==6){
        header('Content-Type: application/json');
        $jala = $_usuario->setUserActive();
        echo $jala;
    }

    if($datos["opc"]==7){
        header('Content-Type: application/json');
        $jala = $_usuario->setUserInactive();
        echo $jala;
    }


    //header('Content-Type: application/json');//le dices que devuelve un json
    
    //echo $jala;
    //json_encode($jala);
?>