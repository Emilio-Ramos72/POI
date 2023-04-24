<?php
    require_once "conexion.php";
    session_start();
    class Equipo extends conexion{
    
        public function CrearEquipo($json, $blob){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            $creador = $_SESSION["id"];
            
            $query = "Call sp_EQUIPO_C('$nombre', '$creador', '$blob');";
            
            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";

                return  parent::Error();

            
            }
           ;
        }
    
    
    
    
    
    }