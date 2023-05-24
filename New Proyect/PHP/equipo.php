<?php
require_once 'classequipo.php';
$_equipo = new Equipo;
$postbody = file_get_contents("php://input");
$datos = json_decode($postbody,true);

if($_POST['opc']==1){
    $name=$_POST['nombre'];
    $file_tmpi = $_FILES['foto']['tmp_name'];
        $file = file_get_contents( $file_tmpi);
        $blob =mysqli_real_escape_string($_equipo->conexion,$file);

    $json = [
        "nombre" => $name
    ];

    $coso = json_encode($json);


     $jala = $_equipo->CrearEquipo($coso, $blob);
     echo $jala;
 }
 if($_POST['opc']==2){
     $jala = $_equipo->LastTeam();
     echo $jala;
 }
 if($_POST['opc']==3){
    $jala = $_equipo->AddMember($_POST["Team_Id"], $_POST["Usuario_Id"]);
    echo $jala;
}
if($_POST['opc']==4){
    $jala = $_equipo->ShowTeam($_POST["Team_Id"]);
    echo $jala;
}
if($_POST['opc']==5){
    $jala = $_equipo->MemberofTeam();
    echo $jala;
}
if($_POST['opc']==6){
    $id = $_SESSION['id'];

    echo $id;
}
 

