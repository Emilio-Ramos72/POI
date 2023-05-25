<?php
require_once 'classTareas.php';
$_tarea = new Tarea;
$postbody = file_get_contents("php://input");
$datos = json_decode($postbody,true);

if($datos['opc']==1){
     $jala = $_tarea->CrearTarea($postbody);
     echo $jala;
 }

 //select de las tareas
 if($datos['opc']==2){
    $jala = $_tarea->ShowTareas();
    echo $jala;
 }


    if($datos['opc']==3){
        $jala = $_tarea->ShowTarea($postbody);
        echo $jala;
}