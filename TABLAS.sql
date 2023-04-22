create database POI;
Use database POI;

create table USUARIO(
ID	INT PRIMARY KEY NOT NULL,
AVATAR BLOB,
NOMBRE varchar(25),
USUARIO VARCHAR (50), 
CORREO VARCHAR(50),
PW varchar(25),
ACTIVO BOOL DEFAULT 1
);

Create table EQUIPO(
ID	INT PRIMARY KEY NOT NULL,
NOMBRE varchar(25),
ACTIVO BOOL DEFAULT 1
);

Create table PUBLICACIONES(
ID	INT PRIMARY KEY NOT NULL,
PUBLICACION VARCHAR(500),
IMAGE BLOB,
HORA time,
ACTIVO BOOL DEFAULT 1
);

Create table REGISTROLLAMADAS(
ID INT,
DURACION TIME
);

Create table MENSAJE(
ID INT PRIMARY KEY NOT NULL,
MENSAJE VARCHAR(500),
HORA TIME,
VISTO BOOL,
IMAGEN BLOB
);

Create table TAREAS(
ID INT PRIMARY KEY NOT NULL,
TAREA VARCHAR(150)
);

CREATE TABLE USUARIOTAREA(
ID INT PRIMARY KEY NOT NULL,
COMPLETADO BOOL,
)

ALTER TABLE EQUIPO ADD IDCREADOR int FOREIGN KEY REFERENCES USUARIO(ID);

ALTER TABLE PUBLICACIONES ADD IDUSUARIO int FOREIGN KEY REFERENCES USUARIO(ID);
ALTER TABLE PUBLICACIONES ADD IDEQUIPO int FOREIGN KEY REFERENCES EQUIPO(ID);

ALTER TABLE PUBLICACIONES ADD IDTEAM INT int FOREIGN KEY REFERENCES EQUIPO(ID);

ALTER TABLE MENSAJE ADD IDRECEPTOR INT int FOREIGN KEY REFERENCES USUARIO(ID);
ALTER TABLE MENSAJE ADD IDEMISSOR INT int FOREIGN KEY REFERENCES USUARIO(ID);

ALTER TABLE TAREAS ADD USUARIOENCARGADOR INT int FOREIGN KEY REFERENCES USUARIO(ID);

ALTER TABLE USUARIOTAREA ADD USUARIOASIGNADO INT int FOREIGN KEY REFERENCES USUARIO(ID);
ALTER TABLE USUARIOTAREA ADD USUARIOENCARGADOR INT int FOREIGN KEY REFERENCES USUARIO(ID);
