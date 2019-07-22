CREATE DATABASE  IF NOT EXISTS `tchat_dev` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `tchat_dev`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 192.168.17.23    Database: tchat
-- ------------------------------------------------------
-- Server version	5.1.73

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) DEFAULT NULL,
  `conversationId` int(11) DEFAULT NULL,
  `content` text CHARACTER SET utf8,
  `emoticonId` int(11) DEFAULT NULL,
  `time` double DEFAULT NULL,
  `messagetypeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_member_idx` (`memberId`),
  KEY `chat_conversation_idx` (`conversationId`),
  KEY `chat_emoticon_idx` (`emoticonId`),
  KEY `chat_type_idx` (`messagetypeId`),
  CONSTRAINT `chat_conversation` FOREIGN KEY (`conversationId`) REFERENCES `conversation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `chat_emoticon` FOREIGN KEY (`emoticonId`) REFERENCES `emoticon` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `chat_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `chat_type` FOREIGN KEY (`messagetypeId`) REFERENCES `messagetype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2182 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `isPersonal` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversationmember`
--

DROP TABLE IF EXISTS `conversationmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversationmember` (
  `conversationId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  PRIMARY KEY (`conversationId`,`memberId`),
  KEY `conversationmember_member_idx` (`memberId`),
  CONSTRAINT `conversationmember_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `convertsationmember_conversation` FOREIGN KEY (`conversationId`) REFERENCES `conversation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversationmember`
--

LOCK TABLES `conversationmember` WRITE;
/*!40000 ALTER TABLE `conversationmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversationmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emoticon`
--

DROP TABLE IF EXISTS `emoticon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emoticon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `emoticongroupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emoticon_group_idx` (`emoticongroupId`),
  CONSTRAINT `emoticon_group` FOREIGN KEY (`emoticongroupId`) REFERENCES `emoticongroup` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emoticon`
--

LOCK TABLES `emoticon` WRITE;
/*!40000 ALTER TABLE `emoticon` DISABLE KEYS */;
INSERT INTO `emoticon` VALUES (1,'1.png',1),(2,'2.png',1),(3,'3.png',1),(4,'4.png',1),(5,'5.png',1),(6,'6.png',1),(7,'7.png',1),(8,'8.png',1),(9,'9.png',1),(10,'10.png',1),(11,'11.png',1),(12,'12.png',1),(13,'13.png',1),(14,'14.png',1),(15,'15.png',1),(16,'16.png',1),(17,'17.png',1),(18,'18.png',1),(19,'19.png',1),(20,'20.png',1),(21,'21.png',1),(22,'22.png',1),(23,'23.png',1),(24,'24.png',1),(25,'25.png',1),(26,'26.png',1),(27,'27.png',1),(28,'28.png',1),(29,'29.png',1),(30,'30.png',1),(31,'31.png',1),(32,'32.png',1),(33,'1.png',2),(34,'2.png',2),(35,'3.png',2),(36,'4.jpg',2),(37,'5.png',2),(38,'6.jpg',2),(39,'7.jpg',2),(40,'8.jpg',2),(41,'9.jpg',2),(42,'10.jpg',2),(43,'11.jpg',2),(44,'12.jpg',2),(45,'13.png',2),(46,'14.png',2),(47,'15.jpg',2),(48,'16.jpg',2),(49,'17.jpg',2),(50,'18.jpg',2),(51,'19.jpg',2),(52,'20.jpg',2),(53,'1.gif',3),(54,'2.gif',3),(55,'3.gif',3),(56,'4.gif',3),(57,'5.gif',3),(58,'6.gif',3),(59,'7.gif',3),(60,'8.gif',3),(61,'9.gif',3),(62,'10.gif',3),(63,'11.gif',3),(64,'12.gif',3),(65,'13.gif',3),(66,'14.gif',3),(67,'15.gif',3),(68,'16.gif',3),(69,'17.gif',3),(70,'18.gif',3),(71,'19.gif',3),(72,'20.gif',3),(73,'21.gif',3),(74,'22.gif',3),(75,'23.gif',3),(76,'24.gif',3),(77,'25.gif',3),(78,'26.gif',3),(79,'27.gif',3),(80,'28.gif',3),(81,'29.gif',3),(82,'30.gif',3),(83,'31.gif',3),(84,'32.gif',3),(85,'33.gif',3),(86,'34.gif',3),(87,'35.gif',3),(88,'36.gif',3),(89,'37.gif',3),(90,'38.gif',3),(91,'39.gif',3),(92,'40.gif',3),(93,'41.gif',3),(94,'42.gif',3),(95,'43.gif',3),(96,'44.gif',3),(97,'45.gif',3),(98,'46.gif',3),(99,'47.gif',3),(100,'48.gif',3),(101,'49.gif',3),(102,'50.gif',3),(103,'51.gif',3),(104,'52.gif',3),(105,'53.gif',3),(106,'54.gif',3),(107,'55.gif',3),(108,'56.gif',3),(109,'57.gif',3),(110,'58.gif',3),(111,'59.gif',3),(112,'60.gif',3),(113,'61.png',3),(114,'62.gif',3),(115,'63.png',3),(116,'64.png',3),(117,'65.png',3),(118,'66.png',3),(119,'67.png',3),(120,'68.png',3),(121,'69.png',3),(122,'70.png',3),(123,'71.png',3),(124,'72.png',3),(125,'73.png',3),(126,'74.png',3),(213,'1.gif',5),(214,'2.gif',5),(215,'3.gif',5),(216,'4.gif',5),(217,'5.gif',5),(218,'6.gif',5),(219,'7.gif',5),(220,'8.gif',5),(221,'9.gif',5),(222,'10.gif',5),(223,'11.gif',5),(224,'12.gif',5),(225,'13.gif',5),(226,'14.gif',5),(227,'15.gif',5),(228,'16.gif',5),(229,'17.gif',5),(230,'18.gif',5),(231,'19.gif',5),(232,'20.gif',5),(233,'21.gif',5),(234,'22.gif',5),(235,'23.gif',5),(236,'24.gif',5),(237,'25.gif',5),(238,'26.gif',5),(239,'27.gif',5),(240,'28.gif',5),(241,'29.gif',5),(242,'30.gif',5),(243,'31.gif',5),(244,'32.gif',5),(245,'33.gif',5),(246,'34.gif',5),(247,'35.gif',5),(248,'36.gif',5),(249,'37.gif',5),(250,'38.gif',5),(251,'39.gif',5),(252,'1.jpg',5);
/*!40000 ALTER TABLE `emoticon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emoticongroup`
--

DROP TABLE IF EXISTS `emoticongroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emoticongroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `type` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emoticongroup_member_idx` (`memberId`),
  CONSTRAINT `emoticongroup_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emoticongroup`
--

LOCK TABLES `emoticongroup` WRITE;
/*!40000 ALTER TABLE `emoticongroup` DISABLE KEYS */;
INSERT INTO `emoticongroup` VALUES (1,'Monkey',2,'\0'),(2,'Thỏ 7 màu',2,'\0'),(3,'Troll',2,'\0'),(4,'Meme',2,'\0'),(5,'Thỏ',2,'\0');
/*!40000 ALTER TABLE `emoticongroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emoticonmember`
--

DROP TABLE IF EXISTS `emoticonmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emoticonmember` (
  `emoticongroupId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  PRIMARY KEY (`emoticongroupId`,`memberId`),
  KEY `emoticonmember_member_idx` (`memberId`),
  CONSTRAINT `emoticonmember_group` FOREIGN KEY (`emoticongroupId`) REFERENCES `emoticongroup` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `emoticonmember_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emoticonmember`
--

LOCK TABLES `emoticonmember` WRITE;
/*!40000 ALTER TABLE `emoticonmember` DISABLE KEYS */;
INSERT INTO `emoticonmember` VALUES (1,2),(2,2),(3,2),(4,2),(5,2);
/*!40000 ALTER TABLE `emoticonmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gcm`
--

DROP TABLE IF EXISTS `gcm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gcm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registrationId` text,
  `memberId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `memberId` (`memberId`),
  CONSTRAINT `gcm_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gcm`
--

LOCK TABLES `gcm` WRITE;
/*!40000 ALTER TABLE `gcm` DISABLE KEYS */;
/*!40000 ALTER TABLE `gcm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `parentGroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_parentgroup_idx` (`parentGroup`),
  CONSTRAINT `group_parentgroup` FOREIGN KEY (`parentGroup`) REFERENCES `group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupmember`
--

DROP TABLE IF EXISTS `groupmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupmember` (
  `groupId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  PRIMARY KEY (`groupId`,`memberId`),
  KEY `groupmember_member_idx` (`memberId`),
  CONSTRAINT `groupmember_group` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `groupmember_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupmember`
--

LOCK TABLES `groupmember` WRITE;
/*!40000 ALTER TABLE `groupmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `dateOfBirth` double DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `positionId` int(11) DEFAULT NULL,
  `status` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `member_position_idx` (`positionId`),
  KEY `member_user_idx` (`username`),
  CONSTRAINT `member_position` FOREIGN KEY (`positionId`) REFERENCES `position` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `member_user` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (2,'admin',0,'admin','default.jpg',1,'\0'),(3,'Dinh Hoang',0,'ddnhoang','default.jpg',2,''),(4,'Tuấn Lê',0,'leanhtuan','leanhtuan_1459311976387_images.jpg',2,''),(5,'Hung Nguyen',0,'nguyenquochung','default.jpg',3,'\0'),(6,'Cuong Hoang',0,'htcuong','default.jpg',3,''),(7,'Trieu Le',0,'ldttrieu','default.jpg',4,'\0'),(8,'Danh Huỳnh',0,'hcdanh','hcdanh_1465184725237_a.jpg',3,''),(9,'Hung Pham',0,'pquochung','hungpham.jpg',3,'\0'),(10,'Khanh Quach',0,'qmkhanh','khanh.jpg',3,'\0'),(11,'Anh Lam',0,'lamtuananh','default.jpg',4,'\0'),(12,'DIBA',0,'tndbao','tndbao_1459312093080_3147227_chim.jpg',3,''),(13,'Kieu Tran',0,'ttdkieu','ttdkieu_1461553879101_download.jpg',4,'\0'),(14,'Tuan Tran',0,'tvantuan','default.jpg',4,'\0'),(15,'Tanzz',0,'nngoctan','nngoctan_1458620994633_Weheartit.ico',4,'\0'),(16,'Tam Le',0,'lvmtam','lvmtam_1464862626729_Untitled 2.png',4,'\0'),(17,'Thúy Trần',0,'ttkthuy','default.jpg',4,'\0'),(18,'Thinh Vu',0,'vtthinh','default.jpg',4,'\0'),(19,'Tuong Hoang',0,'hvtuong','default.jpg',4,'\0'),(20,'Thuan Nguyen',0,'ntthuan','default.jpg',4,'\0'),(21,'Phuong Nguyen',0,'nvphuong','default.jpg',4,'\0'),(22,'Thien Nguyen',0,'ndthien','default.jpg',4,''),(23,'Minh Nguyen',0,'nahminh','default.jpg',4,'\0'),(24,'Thùy Lê',0,'ltmthuy','default.jpg',4,'\0'),(25,'Tam Nguyen',0,'nhieutam','default.jpg',4,''),(26,'Vuong Dinh',0,'dtvuong','default.jpg',4,''),(27,'Phong Nguyen',0,'ntphong2','default.jpg',3,'\0'),(28,'Bang Tran',0,'thaibang','default.jpg',4,'\0'),(29,'Thong Huynh',0,'hvthong','default.jpg',4,'\0'),(30,'Quyen Le',0,'lvquyen','default.jpg',4,'\0'),(31,'♫ QuangNgô ♫',0,'ndinhquang','default.jpg',4,'\0'),(32,'志公',0,'ntdccong','congngu.png',4,''),(33,'Nguyen Dinh',0,'dlcnguyen','dlcnguyen_1458887454113_1288116.png',4,'\0'),(34,'Kha Nguyen',0,'nhkha','nhkha_1457597999961_Hinh mau thanh nien nghiem tuc.jpg',4,'\0'),(35,'Luan Ngo',0,'ngothanhluan','luanngo.gif',4,'\0'),(36,'Duc Long',0,'tduclong','tduclong_1464665243468_Hydrangeas.jpg',4,'\0'),(37,'Viễn Trần',0,'tmvien','default.jpg',4,''),(38,'Trung Nguyen',0,'nguyenductrung','default.jpg',4,'\0'),(39,'Lan Nguyen',0,'ntlan','default.jpg',4,'\0'),(40,'Si Tran',0,'ttsi','default.jpg',4,''),(41,'Thai Luu',0,'lmthai','default.jpg',4,''),(42,'Thang Ha',0,'hcthang','default.jpg',4,'\0'),(43,'Hau Nguyen',0,'nvhau','default.jpg',4,'\0'),(44,'Tướng Phạm',NULL,'pvtuong','pvtuong_1464679713876_tho-bay-mau-42.png',4,'\0'),(45,'Le Le',0,'lvle','12.gif',4,'\0'),(46,'Nguyen Minh Hieu',0,'nmhieu','default.jpg',4,'\0'),(47,'Phat Ly',0,'ltphat','default.jpg',3,'\0'),(48,'Huy Le',NULL,'lhuy','default.jpg',2,'\0'),(49,'Sinh',0,'tvtsinh','default.jpg',4,'\0'),(50,'Long Tran',NULL,'tthanhlong','tthanhlong_1459334609489_original-048efdb40d.jpg',4,'\0'),(51,'Phuong Nguyen Van',0,'nguyenvanphuong','nguyenvanphuong_1463364538114_usertile16.bmp',4,'\0'),(52,'Thuy Vo',0,'vttthuy','vttthuy_1459313180458_Capture.PNG',4,''),(53,'Hung Van Tan',0,'vtanhung','vtanhung_1459396339133_1299139670_1280x800_grand-sunrise-wallpaper-hd.jpg',4,'\0'),(55,'An Le',0,'lethanhan','lethanhan_1459824870855_images (1).jpg',4,''),(56,'Thien Bui',0,'bvthien','bvthien_1461149568072_DSC_8422.jpg',4,'\0'),(57,'Nhung Nguyen',0,'ntcnhung','default.jpg',4,''),(58,'Quoi Vo Phu',0,'vpquoi','default.jpg',4,'\0'),(59,'Luc Bui Duc',0,'bdluc','default.jpg',4,'\0');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberreadtime`
--

DROP TABLE IF EXISTS `memberreadtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memberreadtime` (
  `memberId` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `lastReadMessageTime` double DEFAULT NULL,
  PRIMARY KEY (`memberId`,`roomId`),
  KEY `memberreadtime_room_idx` (`roomId`),
  CONSTRAINT `memberreadtime_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `memberreadtime_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberreadtime`
--

LOCK TABLES `memberreadtime` WRITE;
/*!40000 ALTER TABLE `memberreadtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `memberreadtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `messagetypeId` int(11) DEFAULT NULL,
  `time` double DEFAULT NULL,
  `body` text CHARACTER SET utf8,
  `attachment` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `emoticonId` int(11) DEFAULT NULL,
  `attachmentFileName` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_room_idx` (`roomId`),
  KEY `message_member_idx` (`memberId`),
  KEY `message_emoticon_idx` (`emoticonId`),
  KEY `message_messagetype_idx` (`messagetypeId`),
  CONSTRAINT `message_emoticon` FOREIGN KEY (`emoticonId`) REFERENCES `emoticon` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `message_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `message_messagetype` FOREIGN KEY (`messagetypeId`) REFERENCES `messagetype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `message_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17630 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messagereply`
--

DROP TABLE IF EXISTS `messagereply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messagereply` (
  `messageId` int(11) NOT NULL,
  `roomId` int(11) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `messagetypeId` int(11) DEFAULT NULL,
  `time` double DEFAULT NULL,
  `body` text CHARACTER SET utf8,
  `attachment` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `emoticonId` int(11) DEFAULT NULL,
  `attachmentFileName` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`messageId`),
  KEY `messagereply_emoticon_idx` (`emoticonId`),
  KEY `messagereply_member_idx` (`memberId`),
  KEY `messagereply_room_idx` (`roomId`),
  KEY `messagereply_type_idx` (`messagetypeId`),
  CONSTRAINT `messagereply_emoticon` FOREIGN KEY (`emoticonId`) REFERENCES `emoticon` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `messagereply_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `messagereply_message` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `messagereply_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `messagereply_type` FOREIGN KEY (`messagetypeId`) REFERENCES `messagetype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messagereply`
--

LOCK TABLES `messagereply` WRITE;
/*!40000 ALTER TABLE `messagereply` DISABLE KEYS */;
/*!40000 ALTER TABLE `messagereply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messagetype`
--

DROP TABLE IF EXISTS `messagetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messagetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messagetype`
--

LOCK TABLES `messagetype` WRITE;
/*!40000 ALTER TABLE `messagetype` DISABLE KEYS */;
INSERT INTO `messagetype` VALUES (1,'Normal'),(2,'attachment'),(3,'image'),(4,'stamp'),(5,'deleted'),(6,'CKEditor'),(7,'important');
/*!40000 ALTER TABLE `messagetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `notification_member_idx` (`memberId`),
  CONSTRAINT `notification_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificationmember`
--

DROP TABLE IF EXISTS `notificationmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificationmember` (
  `idNotification` int(11) NOT NULL,
  `idMember` int(11) NOT NULL,
  PRIMARY KEY (`idNotification`,`idMember`),
  KEY `notificationmember_member_idx` (`idMember`),
  CONSTRAINT `notificationmember_member` FOREIGN KEY (`idMember`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `notificationmember_notification` FOREIGN KEY (`idNotification`) REFERENCES `notification` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationmember`
--

LOCK TABLES `notificationmember` WRITE;
/*!40000 ALTER TABLE `notificationmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificationmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'admin'),(2,'Project manager'),(3,'Team Leader'),(4,'Team Member');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positionrole`
--

DROP TABLE IF EXISTS `positionrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `positionrole` (
  `positionId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`positionId`,`roleId`),
  KEY `positionrole_role_idx` (`roleId`),
  CONSTRAINT `positionrole_position` FOREIGN KEY (`positionId`) REFERENCES `position` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `positionrole_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positionrole`
--

LOCK TABLES `positionrole` WRITE;
/*!40000 ALTER TABLE `positionrole` DISABLE KEYS */;
/*!40000 ALTER TABLE `positionrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `startDate` double DEFAULT NULL,
  `endDate` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectmember`
--

DROP TABLE IF EXISTS `projectmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectmember` (
  `projectId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`,`memberId`),
  KEY `projectmember_member_idx` (`memberId`),
  CONSTRAINT `projectmember_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `projectmember_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectmember`
--

LOCK TABLES `projectmember` WRITE;
/*!40000 ALTER TABLE `projectmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `lastMessageTime` double DEFAULT '0',
  `priority` int(11) DEFAULT '0',
  `isVisible` bit(1) DEFAULT b'1',
  `isNotify` bit(1) DEFAULT b'1',
  `isAnonymous` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (4,'NTTS Group',0,11,'','','\0'),(5,'日本語ルーム',0,12,'','','\0'),(6,'English club',0,13,'','','\0'),(7,'iOS sharing',0,14,'','','\0'),(8,'Android sharing',0,15,'','','\0'),(9,'SmartPBX',0,21,'','','\0'),(10,'FTPGUI',0,22,'','','\0'),(11,'Training14a',0,23,'','','\0'),(12,'Crossway14B',0,24,'','','\0'),(13,'NW-API',0,25,'','','\0'),(14,'Resilent Step5',0,26,'','','\0'),(15,'SmartPBXDev',0,27,'','','\0'),(16,'SmartPBX SIP',0,28,'','','\0'),(17,'Crossway14C',0,29,'','','\0'),(18,'Resilent',0,30,'','','\0'),(19,'TopicRoom',0,31,'','','\0'),(20,'TopicRoom daily report',0,32,'','','\0'),(21,'Perfin',0,33,'','','\0'),(22,'Test Room',0,888,'','','\0'),(23,'Feedback',0,999,'','','\0'),(24,'Sales Support System',0,34,'','','\0'),(25,'Plus Muse',0,35,'','','\0'),(26,'NGC',0,36,'','','\0'),(27,'NW-API Research',0,37,'','','\0'),(28,'NGC (daily report)',0,38,'','','\0'),(29,'NW-API MAGONIA',0,39,'','','\0'),(30,'Bizrenv step 1.5',0,40,'','','\0'),(31,'Navigator',0,41,'','','\0'),(32,'MIMAMORI',0,42,'','','\0'),(33,'Learning Cloud',0,43,'','','\0'),(34,'Bizrenv server 2.0',0,44,'','','\0'),(35,'AIA-LMS',0,45,'','','\0'),(36,'New Room',0,0,'','','\0'),(37,'NTTS Confessions',0,46,'','',''),(38,'Presentation Feedback',0,0,'','',''),(39,'Himitsu',0,0,'','','\0'),(40,'@Luan',0,0,'','','\0'),(41,'@Kha',0,0,'','','\0'),(42,'@New members',0,0,'','','\0'),(43,'@Nhung',0,0,'','','\0'),(44,'@Nhung',0,0,'','','\0'),(45,'@Nhung',0,0,'','','\0'),(46,'@Nhung',0,0,'','','\0'),(47,'@Nhung',0,0,'','','\0'),(48,'@Nhung',0,0,'','','\0'),(49,'Test Room 2',0,0,'','','\0'),(50,'1111',0,0,'','','\0'),(51,'333',0,0,'','','\0'),(52,'44',0,0,'','','\0'),(53,'55',0,0,'','','\0'),(54,'66',0,0,'','','\0'),(55,'test',0,0,'','','\0'),(56,'@Kha',0,0,'','','\0'),(57,'Di cung Euro',0,0,'','','\0');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roommember`
--

DROP TABLE IF EXISTS `roommember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roommember` (
  `roomId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `isAdmin` bit(1) DEFAULT b'0',
  `note` varchar(45) DEFAULT NULL,
  `isNotify` bit(1) DEFAULT b'1',
  `isVisible` bit(1) DEFAULT b'1',
  PRIMARY KEY (`roomId`,`memberId`),
  KEY `roommember_member_idx` (`memberId`),
  CONSTRAINT `roommember_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `roommember_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roommember`
--

LOCK TABLES `roommember` WRITE;
/*!40000 ALTER TABLE `roommember` DISABLE KEYS */;
INSERT INTO `roommember` VALUES (4,3,'',NULL,'',''),(4,4,'',NULL,'',''),(4,5,NULL,NULL,'',''),(4,6,NULL,NULL,'',''),(4,8,'',NULL,'',''),(4,9,NULL,NULL,'',''),(4,10,'\0',NULL,'',''),(4,12,NULL,NULL,'',''),(4,13,NULL,NULL,'',''),(4,14,NULL,NULL,'',''),(4,15,NULL,NULL,'',''),(4,16,NULL,NULL,'\0',''),(4,21,NULL,NULL,'',''),(4,22,NULL,NULL,'',''),(4,23,NULL,NULL,'',''),(4,25,NULL,NULL,'',''),(4,26,NULL,NULL,'',''),(4,27,NULL,NULL,'',''),(4,28,NULL,NULL,'',''),(4,32,NULL,NULL,'',''),(4,33,NULL,NULL,'',''),(4,34,NULL,NULL,'',''),(4,35,NULL,NULL,'',''),(4,36,NULL,NULL,'',''),(4,37,NULL,NULL,'',''),(4,38,NULL,NULL,'',''),(4,39,NULL,NULL,'',''),(4,40,NULL,NULL,'',''),(4,41,NULL,NULL,'',''),(4,44,NULL,NULL,'',''),(4,45,NULL,NULL,'',''),(4,46,NULL,NULL,'',''),(4,47,NULL,NULL,'',''),(4,48,NULL,NULL,'',''),(4,49,NULL,NULL,'\0',''),(4,50,NULL,NULL,'',''),(4,51,NULL,NULL,'',''),(4,52,NULL,NULL,'',''),(4,53,NULL,NULL,'',''),(4,57,'\0',NULL,'',''),(5,3,NULL,NULL,'',''),(5,4,'',NULL,'',''),(5,5,NULL,NULL,'',''),(5,6,NULL,NULL,'',''),(5,7,NULL,NULL,'',''),(5,8,NULL,NULL,'',''),(5,9,NULL,NULL,'',''),(5,10,NULL,NULL,'',''),(5,11,NULL,NULL,'',''),(5,12,NULL,NULL,'',''),(5,13,NULL,NULL,'',''),(5,14,NULL,NULL,'',''),(5,15,NULL,NULL,'',''),(5,16,NULL,NULL,'\0','\0'),(5,17,NULL,NULL,'',''),(5,18,NULL,NULL,'',''),(5,19,NULL,NULL,'',''),(5,20,NULL,NULL,'',''),(5,21,NULL,NULL,'',''),(5,22,NULL,NULL,'',''),(5,23,NULL,NULL,'',''),(5,24,NULL,NULL,'',''),(5,25,NULL,NULL,'',''),(5,26,NULL,NULL,'',''),(5,27,NULL,NULL,'',''),(5,28,NULL,NULL,'',''),(5,29,NULL,NULL,'',''),(5,30,NULL,NULL,'',''),(5,31,NULL,NULL,'',''),(5,32,NULL,NULL,'',''),(5,33,NULL,NULL,'',''),(5,36,NULL,NULL,'\0',''),(5,37,NULL,NULL,'',''),(5,38,NULL,NULL,'',''),(5,39,NULL,NULL,'',''),(5,40,NULL,NULL,'',''),(5,41,NULL,NULL,'',''),(5,42,NULL,NULL,'',''),(5,43,NULL,NULL,'',''),(5,44,NULL,NULL,'',''),(5,45,NULL,NULL,'',''),(5,46,NULL,NULL,'',''),(5,47,NULL,NULL,'',''),(5,48,NULL,NULL,'',''),(5,49,NULL,NULL,'\0',''),(5,50,NULL,NULL,'',''),(5,51,NULL,NULL,'',''),(5,52,NULL,NULL,'',''),(5,53,NULL,NULL,'',''),(5,57,'\0',NULL,'',''),(6,3,NULL,NULL,'',''),(6,4,'',NULL,'',''),(6,5,NULL,NULL,'',''),(6,6,NULL,NULL,'',''),(6,7,NULL,NULL,'',''),(6,8,'',NULL,'','\0'),(6,9,NULL,NULL,'',''),(6,10,NULL,NULL,'',''),(6,11,NULL,NULL,'',''),(6,12,NULL,NULL,'',''),(6,13,NULL,NULL,'',''),(6,14,NULL,NULL,'',''),(6,15,NULL,NULL,'',''),(6,16,NULL,NULL,'\0','\0'),(6,17,NULL,NULL,'',''),(6,18,NULL,NULL,'',''),(6,19,NULL,NULL,'',''),(6,20,NULL,NULL,'',''),(6,21,NULL,NULL,'',''),(6,22,NULL,NULL,'',''),(6,23,NULL,NULL,'',''),(6,24,NULL,NULL,'',''),(6,25,NULL,NULL,'',''),(6,26,NULL,NULL,'',''),(6,27,NULL,NULL,'',''),(6,28,NULL,NULL,'',''),(6,29,NULL,NULL,'',''),(6,30,NULL,NULL,'',''),(6,31,NULL,NULL,'',''),(6,32,NULL,NULL,'',''),(6,33,NULL,NULL,'',''),(6,34,NULL,NULL,'',''),(6,35,NULL,NULL,'',''),(6,36,NULL,NULL,'',''),(6,37,NULL,NULL,'',''),(6,38,NULL,NULL,'',''),(6,39,NULL,NULL,'',''),(6,40,NULL,NULL,'',''),(6,41,NULL,NULL,'',''),(6,42,NULL,NULL,'',''),(6,43,NULL,NULL,'',''),(6,44,NULL,NULL,'',''),(6,45,NULL,NULL,'',''),(6,46,NULL,NULL,'',''),(6,47,NULL,NULL,'',''),(6,48,NULL,NULL,'',''),(6,49,NULL,NULL,'\0',''),(6,50,NULL,NULL,'',''),(6,51,NULL,NULL,'',''),(6,52,NULL,NULL,'',''),(6,53,NULL,NULL,'',''),(6,57,'\0',NULL,'',''),(7,3,NULL,NULL,'',''),(7,4,'',NULL,'',''),(7,5,NULL,NULL,'',''),(7,6,NULL,NULL,'','\0'),(7,7,NULL,NULL,'',''),(7,8,'',NULL,'\0','\0'),(7,9,NULL,NULL,'',''),(7,10,NULL,NULL,'',''),(7,11,NULL,NULL,'',''),(7,12,NULL,NULL,'',''),(7,13,NULL,NULL,'',''),(7,14,NULL,NULL,'',''),(7,15,NULL,NULL,'',''),(7,16,NULL,NULL,'\0',''),(7,17,NULL,NULL,'',''),(7,18,NULL,NULL,'',''),(7,19,NULL,NULL,'',''),(7,20,NULL,NULL,'',''),(7,21,NULL,NULL,'',''),(7,22,NULL,NULL,'',''),(7,23,NULL,NULL,'',''),(7,24,NULL,NULL,'',''),(7,25,NULL,NULL,'',''),(7,26,NULL,NULL,'',''),(7,27,NULL,NULL,'',''),(7,28,NULL,NULL,'',''),(7,29,NULL,NULL,'',''),(7,30,NULL,NULL,'',''),(7,31,NULL,NULL,'',''),(7,32,NULL,NULL,'',''),(7,33,NULL,NULL,'',''),(7,34,NULL,NULL,'',''),(7,35,NULL,NULL,'',''),(7,36,NULL,NULL,'',''),(7,37,NULL,NULL,'',''),(7,38,NULL,NULL,'',''),(7,39,NULL,NULL,'',''),(7,40,NULL,NULL,'',''),(7,41,NULL,NULL,'',''),(7,42,NULL,NULL,'',''),(7,43,NULL,NULL,'',''),(7,44,NULL,NULL,'',''),(7,45,NULL,NULL,'',''),(7,46,NULL,NULL,'',''),(7,47,NULL,NULL,'',''),(7,48,NULL,NULL,'',''),(7,49,NULL,NULL,'\0',''),(7,50,NULL,NULL,'',''),(7,51,NULL,NULL,'',''),(7,52,NULL,NULL,'',''),(7,53,NULL,NULL,'',''),(7,57,'\0',NULL,'',''),(8,3,NULL,NULL,'',''),(8,4,'',NULL,'',''),(8,5,NULL,NULL,'',''),(8,6,NULL,NULL,'','\0'),(8,7,NULL,NULL,'',''),(8,8,'',NULL,'',''),(8,9,NULL,NULL,'',''),(8,10,NULL,NULL,'',''),(8,11,NULL,NULL,'',''),(8,12,NULL,NULL,'',''),(8,13,NULL,NULL,'',''),(8,14,NULL,NULL,'',''),(8,15,NULL,NULL,'',''),(8,16,NULL,NULL,'\0','\0'),(8,17,NULL,NULL,'',''),(8,18,NULL,NULL,'',''),(8,19,NULL,NULL,'',''),(8,20,NULL,NULL,'',''),(8,21,NULL,NULL,'',''),(8,22,NULL,NULL,'',''),(8,23,NULL,NULL,'',''),(8,24,NULL,NULL,'',''),(8,25,NULL,NULL,'',''),(8,26,NULL,NULL,'',''),(8,27,NULL,NULL,'',''),(8,28,NULL,NULL,'',''),(8,29,NULL,NULL,'',''),(8,30,NULL,NULL,'',''),(8,31,NULL,NULL,'',''),(8,32,NULL,NULL,'',''),(8,33,NULL,NULL,'',''),(8,34,NULL,NULL,'',''),(8,35,NULL,NULL,'',''),(8,36,NULL,NULL,'',''),(8,37,NULL,NULL,'',''),(8,38,NULL,NULL,'',''),(8,39,NULL,NULL,'',''),(8,40,NULL,NULL,'',''),(8,41,NULL,NULL,'',''),(8,42,NULL,NULL,'',''),(8,43,NULL,NULL,'',''),(8,44,NULL,NULL,'',''),(8,45,NULL,NULL,'',''),(8,46,NULL,NULL,'',''),(8,47,NULL,NULL,'',''),(8,48,NULL,NULL,'',''),(8,49,NULL,NULL,'\0',''),(8,50,NULL,NULL,'',''),(8,51,NULL,NULL,'',''),(8,52,NULL,NULL,'',''),(8,53,NULL,NULL,'',''),(8,57,'\0',NULL,'',''),(9,3,'',NULL,'',''),(9,6,'',NULL,'',''),(9,13,NULL,NULL,'',''),(9,26,NULL,NULL,'',''),(10,7,'',NULL,'',''),(11,3,'',NULL,'',''),(11,5,'',NULL,'',''),(12,3,'',NULL,'',''),(12,5,'',NULL,'',''),(12,9,NULL,NULL,'',''),(12,12,NULL,NULL,'',''),(12,13,NULL,NULL,'',''),(12,14,NULL,NULL,'',''),(12,20,NULL,NULL,'',''),(12,21,NULL,NULL,'',''),(12,22,NULL,NULL,'',''),(12,23,NULL,NULL,'',''),(13,3,NULL,NULL,'',''),(13,4,'',NULL,'','\0'),(13,9,NULL,NULL,'',''),(13,10,'',NULL,'',''),(13,12,NULL,NULL,'',''),(13,21,NULL,NULL,'',''),(13,24,NULL,NULL,'',''),(13,33,NULL,NULL,'',''),(13,44,NULL,NULL,'',''),(14,3,'',NULL,'',''),(14,7,NULL,NULL,'',''),(14,10,'',NULL,'',''),(14,12,NULL,NULL,'',''),(14,22,NULL,NULL,'',''),(14,32,NULL,NULL,'',''),(15,5,'',NULL,'',''),(16,5,'',NULL,'',''),(17,5,'',NULL,'',''),(17,9,'',NULL,'',''),(17,12,'',NULL,'',''),(17,13,NULL,NULL,'',''),(17,14,NULL,NULL,'',''),(19,3,NULL,NULL,'',''),(19,7,NULL,NULL,'',''),(19,8,'',NULL,'',''),(19,11,NULL,NULL,'',''),(19,16,NULL,NULL,'\0',''),(19,17,NULL,NULL,'',''),(19,19,NULL,NULL,'',''),(19,31,NULL,NULL,'',''),(19,34,NULL,NULL,'',''),(19,35,NULL,NULL,'\0',''),(19,36,NULL,NULL,'',''),(19,37,NULL,NULL,'',''),(20,3,NULL,NULL,'',''),(20,7,NULL,NULL,'',''),(20,8,'',NULL,'',''),(20,11,NULL,NULL,'',''),(20,16,NULL,NULL,'\0','\0'),(20,28,NULL,NULL,'',''),(20,31,NULL,NULL,'',''),(20,34,NULL,NULL,'',''),(20,35,NULL,NULL,'\0',''),(20,36,NULL,NULL,'',''),(20,37,NULL,NULL,'',''),(20,42,NULL,NULL,'',''),(21,3,NULL,NULL,'',''),(21,6,'',NULL,'','\0'),(21,13,NULL,NULL,'',''),(21,25,NULL,NULL,'',''),(21,26,NULL,NULL,'',''),(22,3,NULL,NULL,'',''),(22,4,'\0',NULL,'',''),(22,5,NULL,NULL,'',''),(22,6,NULL,NULL,'','\0'),(22,7,NULL,NULL,'',''),(22,8,'',NULL,'',''),(22,9,NULL,NULL,'',''),(22,10,NULL,NULL,'',''),(22,11,NULL,NULL,'',''),(22,12,NULL,NULL,'',''),(22,13,NULL,NULL,'',''),(22,14,NULL,NULL,'',''),(22,15,NULL,NULL,'',''),(22,16,NULL,NULL,'\0',''),(22,17,NULL,NULL,'',''),(22,18,NULL,NULL,'',''),(22,19,NULL,NULL,'',''),(22,20,NULL,NULL,'',''),(22,21,NULL,NULL,'',''),(22,22,NULL,NULL,'',''),(22,23,NULL,NULL,'',''),(22,24,NULL,NULL,'',''),(22,25,NULL,NULL,'',''),(22,26,NULL,NULL,'',''),(22,27,NULL,NULL,'',''),(22,28,NULL,NULL,'',''),(22,29,NULL,NULL,'',''),(22,30,NULL,NULL,'',''),(22,31,NULL,NULL,'',''),(22,32,NULL,NULL,'',''),(22,33,NULL,NULL,'',''),(22,34,NULL,NULL,'',''),(22,35,NULL,NULL,'\0',''),(22,36,NULL,NULL,'\0',''),(22,37,NULL,NULL,'',''),(22,44,NULL,NULL,'',''),(22,45,NULL,NULL,'',''),(22,46,NULL,NULL,'',''),(22,47,NULL,NULL,'',''),(22,48,NULL,NULL,'',''),(22,49,NULL,NULL,'\0',''),(22,50,NULL,NULL,'',''),(22,51,NULL,NULL,'',''),(22,52,NULL,NULL,'',''),(22,53,NULL,NULL,'',''),(22,57,'\0',NULL,'',''),(23,3,NULL,NULL,'',''),(23,4,'\0',NULL,'',''),(23,5,NULL,NULL,'',''),(23,6,NULL,NULL,'',''),(23,7,NULL,NULL,'',''),(23,8,'',NULL,'',''),(23,9,NULL,NULL,'',''),(23,10,NULL,NULL,'',''),(23,11,NULL,NULL,'',''),(23,12,NULL,NULL,'',''),(23,13,NULL,NULL,'',''),(23,14,NULL,NULL,'',''),(23,15,NULL,NULL,'',''),(23,16,NULL,NULL,'\0','\0'),(23,17,NULL,NULL,'',''),(23,18,NULL,NULL,'',''),(23,19,NULL,NULL,'',''),(23,20,NULL,NULL,'',''),(23,21,NULL,NULL,'',''),(23,22,NULL,NULL,'',''),(23,23,NULL,NULL,'',''),(23,24,NULL,NULL,'',''),(23,25,NULL,NULL,'',''),(23,26,NULL,NULL,'',''),(23,27,NULL,NULL,'',''),(23,28,NULL,NULL,'',''),(23,29,NULL,NULL,'',''),(23,30,NULL,NULL,'',''),(23,31,NULL,NULL,'',''),(23,32,NULL,NULL,'',''),(23,33,NULL,NULL,'',''),(23,36,NULL,NULL,'',''),(23,37,NULL,NULL,'',''),(23,38,NULL,NULL,'',''),(23,39,NULL,NULL,'',''),(23,40,NULL,NULL,'',''),(23,41,NULL,NULL,'',''),(23,42,NULL,NULL,'',''),(23,43,NULL,NULL,'',''),(23,44,NULL,NULL,'',''),(23,45,NULL,NULL,'',''),(23,46,NULL,NULL,'',''),(23,47,NULL,NULL,'',''),(23,48,NULL,NULL,'',''),(23,49,NULL,NULL,'\0',''),(23,50,NULL,NULL,'',''),(23,51,NULL,NULL,'',''),(23,52,NULL,NULL,'',''),(23,53,NULL,NULL,'',''),(23,57,'\0',NULL,'',''),(24,3,NULL,NULL,'',''),(24,4,'',NULL,'','\0'),(24,8,'',NULL,'','\0'),(24,9,NULL,NULL,'',''),(24,16,NULL,NULL,'\0','\0'),(24,34,NULL,NULL,'',''),(25,8,'',NULL,'','\0'),(25,35,NULL,NULL,'',''),(26,3,NULL,NULL,'',''),(26,4,'',NULL,'','\0'),(26,8,'',NULL,'',''),(26,16,'',NULL,'\0',''),(26,34,NULL,NULL,'',''),(26,35,NULL,NULL,'',''),(26,38,NULL,NULL,'',''),(26,39,NULL,NULL,'',''),(26,42,NULL,NULL,'',''),(26,43,NULL,NULL,'',''),(27,3,NULL,NULL,'',''),(27,4,'',NULL,'','\0'),(27,9,NULL,NULL,'',''),(27,12,NULL,NULL,'',''),(27,40,NULL,NULL,'',''),(27,41,NULL,NULL,'',''),(28,4,'',NULL,'','\0'),(28,8,'',NULL,'',''),(28,16,'',NULL,'\0','\0'),(28,34,NULL,NULL,'',''),(28,35,NULL,NULL,'',''),(28,42,NULL,NULL,'',''),(28,43,NULL,NULL,'',''),(29,3,NULL,NULL,'',''),(29,4,'',NULL,'','\0'),(29,9,NULL,NULL,'',''),(29,12,NULL,NULL,'',''),(29,27,'',NULL,'',''),(29,40,NULL,NULL,'',''),(29,41,NULL,NULL,'',''),(30,10,'',NULL,'',''),(30,12,NULL,NULL,'',''),(30,15,NULL,NULL,'',''),(30,33,NULL,NULL,'',''),(30,44,NULL,NULL,'',''),(31,6,'',NULL,'','\0'),(31,27,'',NULL,'',''),(31,32,NULL,NULL,'',''),(31,45,NULL,NULL,'',''),(31,46,NULL,NULL,'',''),(31,47,NULL,NULL,'',''),(32,4,'',NULL,'','\0'),(32,21,NULL,NULL,'',''),(33,12,NULL,NULL,'\0',''),(33,25,NULL,NULL,'',''),(33,40,'',NULL,'',''),(33,41,NULL,NULL,'',''),(33,48,NULL,NULL,'',''),(33,49,NULL,NULL,'',''),(33,56,'\0',NULL,'',''),(34,4,'',NULL,'',''),(34,12,'',NULL,'',''),(34,15,NULL,NULL,'',''),(34,16,NULL,NULL,'',''),(34,25,'',NULL,'',''),(34,44,NULL,NULL,'',''),(34,52,NULL,NULL,'',''),(34,55,'\0',NULL,'',''),(35,4,'',NULL,'','\0'),(35,15,NULL,NULL,'',''),(36,31,'',NULL,'',''),(37,3,'\0',NULL,'',''),(37,4,'\0',NULL,'',''),(37,5,'\0',NULL,'',''),(37,6,'\0',NULL,'',''),(37,8,'',NULL,'\0',''),(37,9,'\0',NULL,'',''),(37,10,'\0',NULL,'',''),(37,12,'\0',NULL,'',''),(37,13,'\0',NULL,'',''),(37,14,'\0',NULL,'',''),(37,15,'\0',NULL,'',''),(37,16,'\0',NULL,'\0','\0'),(37,21,'\0',NULL,'',''),(37,25,'\0',NULL,'',''),(37,26,'\0',NULL,'',''),(37,27,'\0',NULL,'',''),(37,32,'\0',NULL,'',''),(37,33,'\0',NULL,'',''),(37,34,'\0',NULL,'',''),(37,35,'\0',NULL,'',''),(37,36,'\0',NULL,'',''),(37,37,'\0',NULL,'',''),(37,44,'\0',NULL,'',''),(37,45,'\0',NULL,'',''),(37,47,'\0',NULL,'',''),(37,50,'\0',NULL,'',''),(37,51,'\0',NULL,'',''),(38,3,'\0',NULL,'',''),(38,4,'\0',NULL,'',''),(38,5,'\0',NULL,'',''),(38,6,'\0',NULL,'','\0'),(38,8,'',NULL,'',''),(38,9,'\0',NULL,'',''),(38,10,'\0',NULL,'',''),(38,12,'\0',NULL,'',''),(38,13,'\0',NULL,'',''),(38,14,'\0',NULL,'',''),(38,15,'\0',NULL,'',''),(38,16,'\0',NULL,'\0','\0'),(38,21,'\0',NULL,'',''),(38,25,'\0',NULL,'',''),(38,26,'\0',NULL,'',''),(38,27,'\0',NULL,'',''),(38,28,'\0',NULL,'',''),(38,32,'\0',NULL,'',''),(38,33,'\0',NULL,'',''),(38,34,'\0',NULL,'',''),(38,35,'\0',NULL,'',''),(38,36,'\0',NULL,'',''),(38,37,'\0',NULL,'',''),(38,44,'\0',NULL,'',''),(38,45,'\0',NULL,'',''),(38,47,'\0',NULL,'',''),(38,48,'\0',NULL,'',''),(38,50,'\0',NULL,'',''),(38,51,'\0',NULL,'',''),(38,52,'\0',NULL,'',''),(38,53,'\0',NULL,'',''),(38,55,'\0',NULL,'',''),(39,6,'',NULL,'',''),(39,13,'\0',NULL,'',''),(39,14,'\0',NULL,'',''),(39,15,'\0',NULL,'',''),(39,25,'\0',NULL,'',''),(39,26,'\0',NULL,'',''),(39,57,'\0',NULL,'',''),(39,58,'\0',NULL,'',''),(39,59,NULL,NULL,'',''),(40,8,'',NULL,'',''),(40,35,'\0',NULL,'',''),(41,8,'',NULL,'','\0'),(41,34,'\0',NULL,'',''),(42,6,'\0',NULL,'\0',''),(42,8,'',NULL,'',''),(42,9,'\0',NULL,NULL,NULL),(42,57,'\0',NULL,'',''),(42,58,'\0',NULL,'',''),(50,8,'',NULL,NULL,'\0'),(51,8,NULL,NULL,'','\0'),(52,8,'',NULL,NULL,NULL),(53,8,NULL,NULL,'','\0'),(54,2,'\0',NULL,NULL,NULL),(54,8,'',NULL,'\0','\0'),(55,2,'\0',NULL,NULL,NULL),(55,8,'',NULL,'','\0'),(56,8,'',NULL,'',''),(57,4,'',NULL,'','\0');
/*!40000 ALTER TABLE `roommember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(45) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('',''),('admin','admin'),('bdluc',''),('bvthien',''),('ddnhoang','ddnhoang'),('dlcnguyen','dlcnguyen'),('dtvuong','dtvuong'),('hcdanh','hcdanh'),('hcthang','hcthang'),('htcuong','htcuong'),('hvthong','hvthong'),('hvtuong','hvtuong'),('lamtuananh','lamtuananh'),('ldttrieu','ldttrieu'),('leanhtuan','leanhtuan'),('lethanhan',''),('lhuy','lhuy'),('lmthai','lmthai'),('ltmthuy','ltmthuy'),('ltphat','ltphat'),('lvle','lvle'),('lvmtam','lvmtam'),('lvquyen','lvquyen'),('nahminh','nahminh'),('ndinhquang','ndinhquang'),('ndthien','ndthien'),('ngothanhluan','ngothanhluan'),('nguyenductrung','nguyenductrung'),('nguyenquochung','nguyenquochung'),('nguyenvanphuong',''),('nhieutam','nhieutam'),('nhkha','nhkha'),('nmhieu','mnhieu'),('nngoctan','nngoctan'),('ntcnhung',''),('ntdccong','ntdccong'),('ntlan','ntlan'),('ntphong2','ntphong2'),('ntthuan','ntthuan'),('nvhau','nvhau'),('nvphuong','nvphuong'),('pquochung','pquochung'),('pvtuong','pvtuong'),('qmkhanh','qmkhanh'),('tduclong','tduclong'),('thaibang','thaibang'),('tmvien','tmvien'),('tndbao','tndbao'),('ttdkieu','ttdkieu'),('tthanhlong','tthanhlong'),('ttkthuy','ttkthuy'),('ttsi','ttsi'),('tvantuan','tvantuan'),('tvtsinh','tvtsinh'),('vpquoi',''),('vtanhung',''),('vtthinh','vtthinh'),('vttthuy','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-10  9:04:04
