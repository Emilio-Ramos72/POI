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


        public function AddMember($Team, $Usuario){
            //$datos = json_decode($json,true);
            //son los datos del json
            //$Team = $datos["Team_Id"];
            //$Usuario = $datos["Usuario_Id"];

            $query = "Call sp_EQUIPOUSUARIOS_C($Team, $Usuario);";

            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";

                return  $success;

            
            }

        }


        public function LastTeam(){
            $query = "Call sp_EQUIPO_SHOWLAST();";
            
            $mensajes = parent::obtenerDatos($query);
            
            if(isset($mensajes[0]["ID"])){           
                return json_encode($mensajes);
             }else{
                 $success="NOTEAM";
                 return $success;
             }


        }

        public function ShowTeam($id){
            $query = "Call sp_EQUIPO_SHOW($id);";
            
            $mensajes = parent::obtenerDatos($query);
            
            if(isset($mensajes[0]["ID"])){           
                return json_encode($mensajes);
             }else{
                 $success="fail";
                 return $success;
             }


        }

    
    
    
    
    
    }