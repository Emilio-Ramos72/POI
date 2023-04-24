<?php
    session_start();
    $variablevarialosa =  $_SESSION["imagenP"];
    header("content_type: image/jpeg");
    echo  $variablevarialosa;
?>