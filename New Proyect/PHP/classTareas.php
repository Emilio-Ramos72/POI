<?php
    require_once "conexion.php";
    session_start();
    class Tarea extends conexion{

        public function CrearTarea($json){
            $datos = json_decode($json,true);
            //son los datos del json
            $tarea = $datos["titulo"];
            $creador = $_SESSION["id"];
            $equipo = $datos["Team_trampa"];
            $descripcion = $datos["descripcion"];
            
             $query = "Call sp_TAREAS_C('$tarea', $creador, $equipo, '$descripcion');";
            
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

        public function ShowTareas(){
            $user = $_SESSION["id"];
            $query = "Call sp_TAREAS_SHOW($user)";
            
            $Tareas = parent::obtenerDatos($query);
                
                if(isset($Tareas[0]["ALUMNO"])){           
                   return json_encode($Tareas);
                }else{
                    $success="NoHayTareas";
                    return $success;
                }
        }
        public function ShowTarea($json){
            $datos = json_decode($json,true);
            $team = $datos["TareaID"];; 
            $user = $_SESSION["id"];
            
            $query = "Call sp_TAREAS_SHOW_TAR($user, $team)";
            
            $Tareas = parent::obtenerDatos($query);
                
                if(isset($Tareas[0]["ALUMNO"])){           
                   return json_encode($Tareas);
                }else{
                    $success="NoExisteTarea";
                    return $success;
                }
        }
}