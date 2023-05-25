<?php
    require_once "conexion.php";
    session_start();
    class Mensajes extends conexion{
        public function mensajeNuevo($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $mensaje = $datos["mensaje"];
            $receptor = $datos["id"];
            $emisor = $_SESSION["id"];
            //estudiante, curso y mensaje
            $query = "Call sp_MENSAJE_C('$mensaje',$receptor,$emisor);";
            $verificacion = parent::rowsAfectados($query);
            if($verificacion == 1){
                $query2 = "CALL sp_MENSAJE_SHOW($emisor,$receptor);";
                $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["RECEPTOR_ID"])){           
                   return json_encode($mensajes);
                }else{
                    $success="NoSePudoCrearUnMensaje";
                    return $success;
                }
            }else{
                $success="fail";
                return  parent::Error();
            }
        }


        public function traerTodosMensajes($json){
            header('Content-Type: application/json');
            $datos = json_decode($json,true);
            $receptor = $datos["dataid"];
            $emisor = $_SESSION["id"];
            //son los datos del json
            $query2 = "CALL sp_MENSAJE_SHOW($emisor,$receptor);";
                $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["RECEPTOR_ID"])){           
                   return json_encode($mensajes);
                }else{
                    $success="NoHayMensajes";
                    return $success;
                }
        }

        public function traerChats(){
            $id= $_SESSION["id"];

            $query2 = "CALL sp_MENSAJE_CHATS($id);";

            $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["RECEPTOR_ID"])){           
                   return json_encode($mensajes);
                }else{
                    $success="NoHayChats";
                    return $success;
                }

        }

        public function pendingmsg($json){
            header('Content-Type: application/json');

            $datos = json_decode($json,true);

            $id= $datos["receptor"];

            $EMID = $_SESSION["id"];

             $query2 = "CALL sp_MENSAJE_PENDING($id, $EMID);";

            $mensajes = parent::obtenerDatos($query2);
                
                if(isset($mensajes[0]["PENDING"])){           
                   return json_encode($mensajes);
                }else{
$success = [
"status" => "NoHayPendientes"
];     
                    return json_encode($success);
                }
        }

        public function viewmsg($json){
            header('Content-Type: application/json');

            $datos = json_decode($json,true);


            $OtherId = $datos["id"];
            $SesId = $_SESSION["id"];

            $query = "Call sp_MENSAJE_VIEW($SesId, $OtherId);";

            $verificacion = parent::rowsAfectados($query);
            
            if($verificacion == 1){
                $success="success";
                return $success;
               
            }else{
                $success="fail";

                return  $success;

            
            }
        }

    }
?>