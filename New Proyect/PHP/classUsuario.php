<?php
    require_once "conexion.php";
    session_start();
    class Usuario extends conexion{
        public function CrearUsuario($json,$foto){
            $datos = json_decode($json,true);
            //son los datos del json
            $nombre = $datos["nombre"];
            
            $nickname = $datos["nickname"];
            $correo = $datos["correo"];
            $password = $datos["password"];
            
            
            $query = "Call sp_USUARIO_C('$nombre','$password','$foto',
            '$nickname','$correo');";
            
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

        public function iniciarSesion($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $correo = $datos["correo"];
            $password = $datos["password"];
            $query = "Call sp_BuscarUsuario('$password','$correo');";
            
            $verificacion = parent::ObtenerUsuario($query);
            if($verificacion==1){
               
                $_SESSION["correo"]=$correo;
               
                $success="sesionEncontrada";
                return $success;
                
            }
            else{
                $success="sesionNoExiste";
                return $success;
               
            }
        }

        public function getPerfilUsuario(){
            header('Content-Type: application/json');
            if(isset($_SESSION["nombre"])){
                $idUs=$_SESSION["id"];
                $nombre=$_SESSION["nombre"];
                
                $nick=$_SESSION["nickname"];
                $correo=$_SESSION["correo"];
               
                
                $json = [
                "idUsuario" => $idUs,
                "nombre" => $nombre,
                
                "nickname"=> $nick,
                "correo"=> $correo,
                
                ];
                return $json;
            }else{
                $success="fail";
                return $success;
            }
        }

        public function getFilterUser($json){
            header('Content-Type: application/json');

            $datos = json_decode($json,true);
            //son los datos del json
            $criteria = $datos["filtro"]; /*filter value*/
            $query = "call sp_FilterUsuario('$criteria');";
            
            $Perfiles = parent::obtenerDatos($query);
            if(isset($Perfiles[0]["NOMBRE"])){
                return json_encode($Perfiles);
            }
            else{
                $success="NoHayPerfiles";
                return $success;
               
            }
        }


    }
?>