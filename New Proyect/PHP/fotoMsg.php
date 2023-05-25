<?php
    include_once '../php/conexion.php';
    $id = $_GET["id"];
    $conexion = new conexion;
    $sql = "call SP_getFotoMsg($id);";
    header("content_type: image/png");
    $result = mysqli_query($conexion->conexion, $sql);
    $row = mysqli_fetch_array($result);
    $imagendata = $row["IMAGEN"];
    echo $imagendata;
?>