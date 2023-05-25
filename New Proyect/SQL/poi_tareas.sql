-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: poi
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TAREA` varchar(150) DEFAULT NULL,
  `DESCRIPCION` varchar(500) DEFAULT NULL,
  `FK_IDCREADOR` int DEFAULT NULL,
  `FK_IDEQUIPO` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_IDCREADOR` (`FK_IDCREADOR`),
  KEY `FK_IDEQUIPO` (`FK_IDEQUIPO`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`FK_IDCREADOR`) REFERENCES `usuario` (`ID`),
  CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`FK_IDEQUIPO`) REFERENCES `equipo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (1,'Tarea de prueba','Hagan tarea',1,2),(6,'Tarea de prueba 2','Hagan tarea',1,2),(8,'Tarea de prueba 2','Hagan tarea',1,2),(10,'Tarea de prueba 2','Hagan tarea',1,2),(12,'Tarea de prueba 2','Hagan tarea',1,2),(14,'Tarea de prueba 2','Hagan tarea',1,2),(15,'Tarea de prueba 5','Hagan tarea',1,2),(16,'Tarea de prueba 6','Hagan tarea',1,2),(17,'Tarea de prueba 6','Hagan tarea',1,2),(20,'Tarea de prueba 10','Hagan tarea',1,2),(21,'Tarea de prueba 11','Hagan tarea',1,2),(22,'OTRA PRUEBA','HOLA',4,31);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-24 19:41:16
