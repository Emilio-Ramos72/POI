<?php
require_once 'classMensajes.php';
$_mensajes = new Mensajes;
//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($datos["opc"]==1){
        $jala = $_mensajes->mensajeNuevo($postbody);
        echo $jala;
    }
    if($datos["opc"]==2){
        $jala = $_mensajes->traerTodosMensajes($postbody);
        echo $jala;
    }
    if($datos["opc"]==3){
        $jala = $_mensajes->chatsDisponibles($postbody);
        echo $jala;
    }

    if($datos["opc"]==4){
        $jala = $_mensajes->traerChats();
        echo $jala;
    }

    if($datos["opc"]==5){
        //pendientes
        $jala = $_mensajes->pendingmsg($postbody);
        echo $jala;
    }

    if($datos["opc"]==6){
        //vistos
        $jala = $_mensajes->viewmsg($postbody);
        echo $jala;
    }
    //header('Content-Type: application/json');//le dices que devuelve un json

    //echo $jala;
    //json_encode($jala);
?>