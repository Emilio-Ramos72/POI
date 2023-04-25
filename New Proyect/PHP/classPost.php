<?php
    require_once "conexion.php";
    session_start();
    class Posts extends conexion{
        public function CrearPost($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $mensaje = $datos["mensaje"];
            
            $equipo = $datos["team"];
           
        
            $query = "Call sp_PUBLICACIONES_C('$mensaje',null,$equipo);";
            
            $verificacion = parent::rowsAfectados($query);
            if($verificacion == 1){
                $query2 = "CALL sp_PUBLICACIONES_SHOWALL($equipo);";
                $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["ID"])){           
                   return json_encode($mensajes);
                }else{
                    $success="NoSePudoCrearUnPost";
                    return $success;
                }
            }else{
                $success="fail";
                return  parent::Error();
            }




        }

        public function PostShowAll($json){
            $datos = json_decode($json,true);


            $equipo = $datos["team"];


            $query2 = "CALL sp_PUBLICACIONES_SHOWALL($equipo);";
                $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["ID"])){           
                   return json_encode($mensajes);
                }else{
                    $success="NoSePudoVerUnPost";
                    return $success;
                }

        }



    }

    ?>