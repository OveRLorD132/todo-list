-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: todo-list
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `subtasks`
--

DROP TABLE IF EXISTS `subtasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subtasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `isFinished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=520 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtasks`
--

LOCK TABLES `subtasks` WRITE;
/*!40000 ALTER TABLE `subtasks` DISABLE KEYS */;
INSERT INTO `subtasks` VALUES (361,396,'fgb',1),(362,396,'fgb',1),(363,396,'fdg',1),(364,396,'bdf',1),(365,396,'bd',1),(366,396,'b',1),(367,396,'vb',1),(368,396,'fgb',1),(369,396,'v',1),(370,396,'lkjlkj',1),(371,396,'jl',1),(372,396,'lj',1),(373,396,'lj',1),(374,396,'kj',1),(411,457,'b',1),(412,457,'fb',1),(413,457,'fc',1),(428,478,'df',1),(429,478,'df',1),(430,478,'vdf',1),(431,478,'v',1),(438,479,'bfg',1),(439,479,'bfg',1),(440,479,'bf',1),(441,479,'bfg',1),(448,482,'sgkhkjh',0),(449,482,'sd',0),(450,482,'dfsd',0),(451,482,'f',0),(452,482,'cv',0),(467,485,'fv',0),(494,499,'v',1),(497,499,'dv',1),(498,499,'df',1),(501,499,'vd',1),(502,499,'v',1),(503,499,'vv',1),(504,499,'d',1),(505,499,'khj',1),(509,499,'дло',1),(510,499,'kjh',1),(511,499,'lkj',1),(512,499,'Close',1);
/*!40000 ALTER TABLE `subtasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `isFinished` tinyint(1) DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=542 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (410,27,'df','All tasks',0,'sdcjgsjhghjghjg'),(411,27,'fd','All tasks',0,NULL),(412,27,'vf','All tasks',0,NULL),(413,27,'vfd','All tasks',0,NULL),(414,27,'v','All tasks',0,'jhgjhg'),(415,27,'fdg','All tasks',0,'jhgjhgjhg'),(416,42,'lkjdf','Important',0,NULL),(417,42,'df','Important',0,NULL),(418,42,'fd','Important',0,NULL),(419,42,'d','Important',0,NULL),(420,42,'vdf','Important',0,NULL),(421,42,'v','Important',0,NULL),(422,42,'zxcv','All tasks',0,NULL),(423,42,'df','All tasks',0,NULL),(424,42,'vd','All tasks',0,NULL),(425,42,'bvfd','All tasks',0,NULL),(434,51,'sd','Important',0,NULL),(435,51,'fsdf','Important',0,NULL),(436,51,'ff','Important',0,NULL),(437,51,'vdf','Important',0,NULL),(442,51,'vsd','All tasks',0,NULL),(443,51,'vfd','All tasks',0,NULL),(487,62,'xc','Important',0,NULL),(488,62,'df','Important',0,NULL),(489,62,'vg','All tasks',0,NULL),(490,62,'bfg','All tasks',0,NULL),(493,62,'bcv','Important',0,NULL),(494,62,'bv','Important',0,NULL),(495,62,'b','Important',0,NULL),(499,24,'sfv','All tasks',1,NULL),(513,24,'cd','Important',0,NULL),(514,24,'vdcvf','Important',0,NULL),(515,24,'vd','Important',0,NULL),(516,24,'vdf','Important',0,NULL),(517,24,'df','All tasks',0,NULL),(518,24,'df','All tasks',0,NULL),(519,24,'df','All tasks',0,NULL),(520,24,'fd','All tasks',0,NULL),(521,24,'gdf','All tasks',0,NULL),(522,24,'v','All tasks',0,NULL),(523,24,'fdgv','All tasks',0,NULL),(524,24,'fd','All tasks',0,NULL),(525,24,'df','All tasks',0,NULL),(526,24,'df','All tasks',0,NULL),(527,24,'g','All tasks',0,NULL),(528,24,'df','All tasks',0,NULL),(529,24,'fd','All tasks',0,NULL),(530,24,'ererf','All tasks',0,NULL),(531,24,'df','All tasks',0,NULL),(532,24,'gd','All tasks',0,NULL),(533,24,'g','All tasks',0,NULL),(534,24,'jkerhgekrjhgkjrhgkjerhgkjerh','All tasks',0,NULL),(536,69,'bfg','Today',1,NULL),(537,69,'bfg','Today',1,NULL),(538,69,'bf','Today',1,NULL),(539,69,'b','Today',1,NULL),(540,69,'vfbb','Today',0,NULL),(541,69,'fgb','Today',0,NULL);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e-mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `e-mail` (`e-mail`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'gudi','$2b$11$wur3wGL9o.VRGdUTYGo5AexJfKrUobMrsTug0Qb.aQzpRjWfk2nOS','gudi','uganda',NULL),(22,'over@over','$2b$11$v4a5tkQ3dEGRd.7RL6zsk.rDgmAXaP7z724PRZ78nTQxzIdcScX22','overover',NULL,NULL),(24,'overlord@overlord','$2b$11$1mA25j/kkKLAG09K0RvfFurHLdzwN4AzXbqxNBuZq9BpthdyCmStO','overlord','jkhkjhjhgjhg','+380503913971'),(27,'gugu','$2b$11$AUzi1hFnXyTF.bs.I1ijnewrb3MVBFc1JR/hiVjlpXa9rqdYcPo1y','gugukjhjkhkjh',NULL,NULL),(29,'gugugu','$2b$11$AtwjJgABaRngKF/1Ynu.k.b./5Di2aCfKX7LeS4hx8Fr3zM9S2k42','gugugujhghjg',NULL,NULL),(38,'vovovov','$2b$11$grzF9KWfk76eFK5aYGNZhuL3xSSPg8vQ/xvQIJh/fZKwqeVPVLDA2','vovovov',NULL,NULL),(51,'email@kljlkj','$2b$11$yvgfbuH3EyZypouWbYY9LuLIfx.DkEzsHUbkR.VFnG1szlo5VQqmK','Overlord23908',NULL,NULL),(55,'gugugugu@gugugugu','$2b$11$ThWazBxfYw21/4z88amE/uQUzyCd5iscegDXye9/C10OozvYGlAbe','gugugujhg','ufufufujhg',NULL),(62,'administrator@administrator','$2b$11$rGoaeYK/fwQYBnmSKHApq.onqgY3aqOzaJKD8OnX5rvKOs2yr2oTG','administrator',NULL,NULL),(69,'overlord132@gmail','$2b$11$T9XtOFdUJBBvSi.FLxMW/uin9DMnXnVl7bMJlMu3tWqWZZP4Vskr.','overlord1322','hihi','+380503913971');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 20:27:51
