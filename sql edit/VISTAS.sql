/* VISTAS */

/**********************************************************************/
CREATE VIEW V_USUARIO_EN_EQUIPO AS
	Select U.ID 
	from EQUIPOUSUARIOS E
    INNER join USUARIO u ON U.ID=E.FK_IDUSUARIO/*FK*/
    INNER join EQUIPO EQ ON EQ.ID=E.FK_IDEQUIPO/*FK*/;
/**********************************************************************/
    CREATE VIEW V_PUBLICACIONES AS
	Select P.ID 
	from EQUIPOPUBLICACIONES P
    INNER join PUBLICACIONES PU ON P.FK_IDPUBLICACION=PU.ID;
/**********************************************************************/
CREATE VIEW V_MENSAJES AS
	Select M.FK_IDEMISSOR AS EMISSOR_NOMBRE,M.FK_IDRECEPTOR AS RECEPTOR_NOMBRE,M.MENSAJE,M.HORA 
	from  MENSAJE M
    INNER JOIN USUARIO IDEMISSOR ON M.FK_IDEMISSOR= IDEMISSOR.ID
	INNER JOIN USUARIO IDRECEPTOR ON M.FK_IDRECEPTOR = IDRECEPTOR.ID;
/**********************************************************************/