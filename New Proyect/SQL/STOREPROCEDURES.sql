/*----------- USUARIO -----------*/

DELIMITER $$  
CREATE PROCEDURE `sp_USUARIO_C` 
(in NOMBRE VARCHAR (25),IN PW VARCHAR(25),IN IMAGEN MEDIUMBLOB,IN USUARIO VARCHAR(50),IN CORREO VARCHAR(50))
BEGIN
INSERT INTO USUARIO(NOMBRE,PW,AVATAR,USUARIO,CORREO) 
VALUES(NOMBRE,PW,IMAGEN,USUARIO,CORREO);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_BuscarUsuario` (IN PW varchar(50),in CORREO VARCHAR (50))
BEGIN
SELECT ID,AVATAR,NOMBRE,USUARIO FROM USUARIO WHERE USUARIO.PW=PW AND USUARIO.CORREO=CORREO;
END
$$
DELIMITER ;


DELIMITER ; 

DELIMITER $$
CREATE PROCEDURE `sp_USUARIO_U` (IN ID_s INT,in NOMBRE VARCHAR (25),IN PW VARCHAR(25),IN IMAGEN BLOB,IN USUARIO VARCHAR(50),IN CORREO VARCHAR(50))
BEGIN
update USUARIO set NOMBRE=NOMBRE, PW=PW, IMAGE=IMAGE, CORREO=CORREO, USUARIO=USUARIO where ID= ID_s;
END
$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_USUARIO_D` (IN ID_s INT)
BEGIN
update USUARIO set ACTIVO=0 where ID= ID_s;
END
$$
DELIMITER ;


/*----------- EQUIPO -----------*/

DELIMITER $$  
CREATE PROCEDURE `sp_EQUIPO_C` 
(in NOMBRE VARCHAR (25))
BEGIN
INSERT INTO EQUIPO(NOMBRE) 
VALUES(NOMBRE);
END $$
DELIMITER ;

DELIMITER ; 

DELIMITER $$
CREATE PROCEDURE `sp_EQUIPO_U` (IN ID_s INT,in NOMBRE VARCHAR (25))
BEGIN
update USUARIO set NOMBRE=NOMBRE where ID= ID_s;
END
$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_EQUIPO_D` (IN ID_s INT)
BEGIN
update EQUIPO set ACTIVO=0 where ID= ID_s;
END
$$
DELIMITER ;


/*----------- MENSAJE -----------*/

DELIMITER $$  
CREATE PROCEDURE `sp_MENSAJE_C` 
(in MENSAJE VARCHAR (25),IN HORA TIME, IN VISTO BOOL,IN IMAGEN BLOB)
BEGIN
INSERT INTO MENSAJE(MENSAJE,HORA,VISTO,IMAGEN) 
VALUES(MENSAJE,HORA,VISTO,IMAGEN);
END $$
DELIMITER ;

DELIMITER ; 

DELIMITER $$
CREATE PROCEDURE `sp_MENSAJE_U` (IN ID_s INT,in MENSAJE VARCHAR (25),IN HORA TIME, IN VISTO BOOL,IN IMAGEN BLOB)
BEGIN
update MENSAJE set MENSAJE=MENSAJE,HORA=HORA,VISTO=VISTO,IMAGEN=IMAGEN where ID= ID_s;
END
$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_MENSAJE_D` (IN ID_s INT)
BEGIN
update MENSAJE set ACTIVO=0 where ID= ID_s;
END
$$
DELIMITER ;

/*----------- PUBLICACION -----------*/

DELIMITER $$  
CREATE PROCEDURE `sp_PUBLICACIONES_C` 
(IN PUBLICACION VARCHAR(500),IN IMAGE BLOB,IN HORA time)
BEGIN
INSERT INTO PUBLICACIONES(PUBLICACION,IMAGE,HORA) 
VALUES(PUBLICACION,IMAGE,HORA);
END $$
DELIMITER ;

DELIMITER ; 

DELIMITER $$
CREATE PROCEDURE `sp_PUBLICACIONES_U` (IN PUBLICACION VARCHAR(500),IN IMAGE BLOB,IN HORA time)
BEGIN
update PUBLICACIONES set PUBLICACION=PUBLICACION,IMAGE=IMAGE,HORA=HORA where ID= ID_s;
END
$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_PUBLICACIONES_D` (IN ID_s INT)
BEGIN
update PUBLICACIONES set ACTIVO=0 where ID= ID_s;
END
$$
DELIMITER ;

/*----------- PUBLICACION -----------*/
