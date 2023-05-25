<?php
require_once 'classPost.php';
$_Posts = new Posts;
    $postbody = file_get_contents("php://input");
    $datos = json_decode($postbody,true);

    if($datos["opc"]==1){
        $jala = $_Posts->CrearPost($postbody);
        echo $jala;
        }

        if($datos["opc"]==2){
            $jala = $_Posts->PostShowAll($postbody);
            echo $jala;
            }
?>