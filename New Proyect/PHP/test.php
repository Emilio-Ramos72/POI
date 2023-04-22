<?php
session_start();
echo  $_SESSION["id"];
echo  $_SESSION["nombre"];
echo  $_SESSION["apellidos"];
echo  $_SESSION["nickname"];
echo  $_SESSION["esMaestro"];
echo  $_SESSION["imagenP"];

?>