-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: RadarDB
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Subject`
--

DROP TABLE IF EXISTS `Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `primary_type` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `name_id_UNIQUE` (`user_id`,`name`),
  CONSTRAINT `user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject`
--

LOCK TABLES `Subject` WRITE;
/*!40000 ALTER TABLE `Subject` DISABLE KEYS */;
INSERT INTO `Subject` VALUES (2,'CS506','blue','Awful','Assignment',2),(4,'CS506','blue','Awful','Assignment',7),(8,'CS507','blue','Awful','Assignment',7),(9,'math','red','','exam',2),(10,'english','blue','','Assignments',2),(11,'Geo','Green','','Assignments',2);
/*!40000 ALTER TABLE `Subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task`
--

DROP TABLE IF EXISTS `Task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `date_complete` datetime DEFAULT NULL,
  `subject_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `subject_id_fkey` (`subject_id`),
  CONSTRAINT `subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`subject_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task`
--

LOCK TABLES `Task` WRITE;
/*!40000 ALTER TABLE `Task` DISABLE KEYS */;
INSERT INTO `Task` VALUES (6,'Geo','','Assignments','2019-01-01 00:00:00',NULL,NULL,9),(7,'some hw','','Assignments','2019-01-01 00:00:00',NULL,NULL,9),(8,'more hw','why','Assignments','2019-01-01 00:00:00',NULL,NULL,9),(9,'even more hw','oh why do I suffer','Assignments','2019-01-01 00:00:00',NULL,NULL,9),(10,'Help me','please','Assignments','2019-01-01 00:00:00',NULL,NULL,10),(11,'it\'s late','at night','Assignments','2019-01-01 00:00:00',NULL,NULL,10),(12,'sleep','is what I want','Assignments','2019-01-01 00:00:00',NULL,NULL,10),(13,'On Wisconsin!','cheese curds... yes','Assignments','2019-01-01 00:00:00',NULL,NULL,11),(14,'cats are better than bunnies','-silvain','Assignments','2019-01-01 00:00:00',NULL,NULL,11),(15,'I\'m sorry','to whoever\'s readin this','Assignments','2019-01-01 00:00:00',NULL,NULL,11),(16,'omae wa mo shinderu','NANI!?!?','Assignments','2019-01-01 00:00:00',NULL,NULL,2),(17,'Do the laundry tomorrow','','Assignments','2019-01-01 00:00:00',NULL,NULL,2),(18,'Tamagochi ftw','','Assignments','2019-01-01 00:00:00',NULL,NULL,2),(19,'Iteration 2','Whores','Exam','2018-11-15 11:59:59',NULL,NULL,4),(20,'Iteration 2','Whores','Exam','2018-11-17 11:59:59',NULL,NULL,8),(21,'Iteration 2','Whores','Exam','2018-11-13 11:59:59',NULL,NULL,4),(22,'Iteration 2','Whores','Exam','2018-11-19 11:59:59',NULL,NULL,8);
/*!40000 ALTER TABLE `Task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `creat_item` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'bob','baba@gmali.com','password','2018-11-02 23:08:22'),(2,'shubham','shubham@radar.com','password','2018-11-15 22:09:46'),(7,'shubham','shubham1@radar.com','password','2018-11-15 22:40:43'),(10,'shubham','shubham2@radar.com','password','2018-11-15 22:56:09'),(22,'Natasha Efendy','nefendy@example.com','radarhw','2018-11-16 00:05:01'),(25,'Clay Mackenthun','cmackenthun@wisc.edu','asecurepassword','2018-11-16 00:13:25'),(28,'Ethan White','ethan.white@wisc.edu','HiDatabaseTeam!','2018-11-16 00:14:47'),(68,'shiyi','shiyi@gmail.com','aaaaa','2018-11-16 00:45:02');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-16 21:59:46
