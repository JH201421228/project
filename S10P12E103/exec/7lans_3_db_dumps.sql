-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_log` (
  `approve_status` bit(1) DEFAULT NULL,
  `write_status` bit(1) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `real_end_time` datetime(6) DEFAULT NULL,
  `real_start_time` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES (_binary '\0',_binary '\0',18,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000',NULL),(_binary '\0',_binary '',19,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000','t1'),(_binary '\0',_binary '',20,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000','t2'),(_binary '\0',_binary '',25,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000','t7'),(_binary '\0',_binary '',26,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000','t8'),(_binary '\0',_binary '',27,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000','y10'),(_binary '\0',_binary '',28,'2023-02-01 10:10:10.000000','2023-02-01 10:10:10.000000','y9'),(_binary '\0',_binary '',33,'2024-02-13 03:00:00.000000','2024-02-13 02:00:00.000000','t13'),(_binary '\0',_binary '',44,'2024-02-17 05:30:00.000000','2024-02-17 03:30:00.000000','승인 테스트2'),(_binary '\0',_binary '',46,'2024-02-09 16:00:00.000000','2024-02-09 14:00:00.000000','단어 만들기 활동을 통해 은희가 좋아하고 관심이 있는 것들을 물어보고 낯을 이제 많이 푼 것 같습니다. 친구들이랑 탕후루를 먹었다는 등 일상적인 이야기를 하기 시작했습니다. 밝은 모습을 많이 보여주기 시작했으니 앞으로 더 자주 만나면 더 마음을 열어줄 것 같습니다. '),(_binary '',_binary '',47,'2024-02-08 21:00:00.000000','2024-02-08 19:00:00.000000','아직은 은희가 낯을 가리는지 제가 주도적으로 대화를 이끌고 있습니다. 내일도 약속이 있으니 놀이를 이용하여 친해지는 기회가 되기를 기대중입니다. 오늘은 카드 뒤집기 놀이와 구구단을 했습니다. 은희가 5단까지는 잘 하지만 더 높은 난이도는 어려워합니다.'),(_binary '\0',_binary '',48,'2024-02-14 03:30:00.000000','2024-02-14 02:00:00.000000','주말에 한 번 더 만난 후라서 더 편하게 대해주는게 느껴집니다. 놀이를 진행하려 했는데 은희가 말을 많이 해 주어서 시간이 다 지나갔습니다. '),(_binary '\0',_binary '',50,'2024-02-15 04:10:18.000000','2024-02-15 03:00:00.000000','승인테스트6'),(_binary '\0',_binary '\0',58,'2024-02-15 02:52:30.000000','2024-02-15 00:35:38.826153',NULL),(_binary '\0',_binary '\0',59,'2024-02-28 01:00:00.000000','2024-02-28 00:00:00.000000',NULL),(_binary '\0',_binary '\0',60,'2024-02-28 23:00:00.000000','2024-02-28 22:00:00.000000',NULL),(_binary '\0',_binary '\0',61,'2024-02-28 13:30:00.000000','2024-02-28 13:00:00.000000',NULL),(_binary '\0',_binary '\0',62,'2024-02-16 19:00:00.000000','2024-02-16 17:30:00.000000',NULL),(_binary '\0',_binary '\0',71,'2024-02-15 08:10:36.000000','2024-02-15 06:26:06.575786',NULL),(_binary '\0',_binary '',72,'2024-02-01 18:30:00.000000','2024-02-01 16:30:00.000000','단어 만들기 활동을 통해 은희가 좋아하고 관심이 있는 것들을 물어보고 낯을 이제 많이 푼 것 같습니다. 친구들이랑 탕후루를 먹었다는 등 일상적인 이야기를 하기 시작했습니다. 밝은 모습을 많이 보여주기 시작했으니 앞으로 더 자주 만나면 더 마음을 열어줄 것 같습니다. '),(_binary '\0',_binary '',73,'2024-02-06 18:30:00.000000','2024-02-06 16:30:00.000000','아직은 은희가 낯을 가리는지 제가 주도적으로 대화를 이끌고 있습니다. 내일도 약속이 있으니 놀이를 이용하여 친해지는 기회가 되기를 기대중입니다. 오늘은 카드 뒤집기 놀이와 구구단을 했습니다. 은희가 5단까지는 잘 하지만 더 높은 난이도는 어려워합니다.'),(_binary '',_binary '',74,'2024-02-09 18:30:00.000000','2024-02-09 16:30:00.000000','주말에 한 번 더 만난 후라서 더 편하게 대해주는게 느껴집니다. 놀이를 진행하려 했는데 은희가 말을 많이 해 주어서 시간이 다 지나갔습니다.'),(_binary '\0',_binary '\0',75,'2024-02-14 06:58:38.000000','2024-02-14 06:53:01.899198',NULL),(_binary '',_binary '',76,'2024-02-15 07:30:30.000000','2024-02-15 07:27:20.722782','오늘 은희와 즐거운 시간을 보냈습니다!'),(_binary '',_binary '',77,'2024-02-01 07:54:12.000000','2024-02-01 07:51:23.070619','즐거운 하루였습니다~'),(_binary '\0',_binary '',78,'2024-02-02 08:01:28.000000','2024-02-02 07:59:23.074384','활동을 입력해 주세요 녹음하기 녹음 녹음'),(_binary '\0',_binary '\0',79,'2024-02-06 08:13:43.000000','2024-02-06 08:12:28.401573',NULL),(_binary '\0',_binary '\0',80,'2024-02-10 20:00:00.000000','2024-02-10 08:37:27.220365',NULL),(_binary '',_binary '',81,'2024-02-15 08:43:03.000000','2024-02-15 08:40:46.024547','즐거운 활동이었습니다');
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child`
--

DROP TABLE IF EXISTS `child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child` (
  `child_center_id` bigint NOT NULL,
  `child_id` bigint NOT NULL,
  `special_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`child_id`),
  KEY `FKpdubw3yyb5d2vjb5kwp8c83nk` (`child_center_id`),
  CONSTRAINT `FKpdubw3yyb5d2vjb5kwp8c83nk` FOREIGN KEY (`child_center_id`) REFERENCES `child_center` (`id`),
  CONSTRAINT `FKr8nk7sxrigxffxypg011a3q65` FOREIGN KEY (`child_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
INSERT INTO `child` VALUES (1,19,'공룡도감을 좋아하니 공룡을 수집할 수 있는 활동을 많이 해주세요'),(1,20,'놀이를 좋아하니 놀이 위주로 활동해주세요'),(1,30,'코딩을 좋아해요!'),(1,31,'연극을 좋아해요!'),(1,35,''),(6,38,'');
/*!40000 ALTER TABLE `child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_center`
--

DROP TABLE IF EXISTS `child_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child_center` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_center`
--

LOCK TABLES `child_center` WRITE;
/*!40000 ALTER TABLE `child_center` DISABLE KEYS */;
INSERT INTO `child_center` VALUES (1,'부산광역시 동래구 명륜로 210','명륜지역아동센터','051-553-8279'),(2,'부산광역시 동래구 금정마을로 93','새롬아동센터','051-552-5502'),(3,'부산광역시 사하구 윤공단로51번길 17 1층, 2층','기쁨지역아동센터','051-962-6304'),(4,'부산광역시 부산진구 서전로47번길 48 2층','한울타리 지역아동센터','051-805-6036'),(5,'부산광역시 부산진구 가야공원로63번길 33-5','풀잎지역아동센터','051-892-5428'),(6,'부산광역시 사상구 사상로 275','희망지역아동센터','051-304-5098'),(7,'부산광역시 연제구 아시아드대로 24 삼도빌딩 402호','세계비전지역아동센터','051-505-0630'),(8,'부산광역시 사하구 낙동남로 1362 201호','하단지역아동센터','051-204-1388'),(9,'부산광역시 남구 동명로 160','용호지역아동센터','051-624-1344'),(10,'부산광역시 금정구 팔송로53번길 14','금샘마을지역아동센터','051-513-2866'),(11,'부산광역시 연제구 쌍미천로 61','다원지역아동센터','051-866-4126'),(12,'부산광역시 해운대구 대천로103번길 9 대림아파트','뉴라이프지역아동센터','051-702-1745'),(13,'부산광역시 서구 해돋이로 71 해강아동관 4층','해강지역아동센터','0507-1476-1370'),(14,'부산광역시 사상구 새벽시장로56번가길 41','사상해오름지역아동센터','051-328-5995'),(15,'부산광역시 동래구 사직북로50번길 49 2층','보금자리지역아동센터','051-507-1206'),(16,'부산광역시 연제구 월드컵대로58번길 28 1층','연제지역아동센터','051-868-0411'),(17,'부산광역시 연제구 거제천로118번길 47 2층','행복나눔지역아동센터','051-903-9006'),(18,'부산광역시 사하구 동매로 161','희망주는 지역아동센터','051-294-9000'),(19,'부산광역시 사하구 사하로 151-1','홀리트리지역아동센터','051-292-2630'),(20,'부산광역시 북구 덕천로 133-1','윤슬지역아동센터','051-581-2992'),(21,'부산광역시 부산진구 중앙대로 978 부산양정2동우체국','부산 평강지역아동센터','051-861-3927'),(22,'부산광역시 기장군 일광읍 해빛로 29','온드림지역아동센터','051-703-7052'),(23,'부산광역시 수영구 민락로34번길 25 2층 참좋은지역아동센터','참 좋은 지역아동센터','051-751-0643'),(24,'부산광역시 남구 용호로178번길 66 남구열린지역아동센터','남구열린지역아동센터','051-611-9818'),(25,'부산광역시 사하구 장평로127번길 20','한마음다문화지역아동센터','051-266-5656'),(26,'부산광역시 금정구 팔송로7번길 21 롯데부동산','두레지역아동센터','051-517-5080'),(27,'부산광역시 금정구 서부로10번길 22 아카데미학원','서동지역아동센터','051-526-6279'),(28,'부산광역시 동래구 시실로107번길 151 동래종합사회복지관','동래지역아동센터','0507-1326-8859'),(29,'부산광역시 기장군 기장읍 차성로417번길 25 2층','교리지역아동센터','051-724-0907'),(30,'부산광역시 사상구 백양대로 527 사상구종합사회복지관','사상구지역아동센터','070-4267-0038');
/*!40000 ALTER TABLE `child_center` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dinosaur`
--

DROP TABLE IF EXISTS `dinosaur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dinosaur` (
  `height` int NOT NULL,
  `weight` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `base_face` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `happy_face` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sad_face` varchar(255) DEFAULT NULL,
  `study_face` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dinosaur`
--

LOCK TABLES `dinosaur` WRITE;
/*!40000 ALTER TABLE `dinosaur` DISABLE KEYS */;
INSERT INTO `dinosaur` VALUES (500,1500,1,'baseFace1','모자에 뭘 숨기고 있는지 모를 공룡입니다.','happyFace1','모자 티라노사우르스','sadFace1','studyFace1'),(500,1500,2,'baseFace2','새로운 것을 배우는걸 좋아하는 공룡입니다.','happyFace2','티라노사우르스','sadFace2','studyFace2'),(500,1500,3,'baseFace3','수줍음이 많은 부끄럼쟁이 공룡입니다.','happyFace3','리본 티라노사우르스','sadFace3','studyFace3'),(600,1600,4,'baseFace4','모자를 벗기면 불같이 화내는 공룡입니다.','happyFace4','모자 알로사우르스','sadFace4','studyFace4'),(600,1600,5,'baseFace5','친해지기 어려운 까탈스러운 공룡입니다.','happyFace5','알로사우르스','sadFace5','studyFace5'),(600,1600,6,'baseFace6','리본을 풀면 부끄러워 숨어버리는 공룡입니다.','happyFace6','리본 알로사우르스','sadFace6','studyFace6'),(1000,2500,7,'baseFace7','뿔이 멋진 멋쟁이 신사 공룡입니다.','happyFace7','뿔 파라사우롤로푸스','sadFace7','studyFace7'),(1000,2500,8,'baseFace8','기분이 좋으면 덩실덩실 춤추는 공룡입니다.','happyFace8','파라사우롤로푸스','sadFace8','studyFace8'),(1000,2500,9,'baseFace9','새로운 친구를 사귀는걸 좋아하는 공룡입니다.','happyFace9','리본 파라사우롤로푸스','sadFace9','studyFace9'),(900,2600,10,'baseFace10','매끈한 피부가 매력적인 공룡입니다.','happyFace10','뿔 카로노사우르스','sadFace10','studyFace10'),(900,2600,11,'baseFace11','항상 당당하고 거침없는 공룡입니다.','happyFace11','카로노사우르스','sadFace11','studyFace11'),(900,2600,12,'baseFace12','친구와의 의리를 중요하게 생각하는 공룡입니다.','happyFace12','리본 카로노사우르스','sadFace12','studyFace12'),(400,1000,13,'baseFace13','새로운 지식을 공부하는걸 좋아하는 공룡입니다.','happyFace13','안경 프테라노돈','sadFace13','studyFace13'),(400,1000,14,'baseFace14','하늘을 날면서 자유로움을 느끼는 공룡입니다.','happyFace14','뿔 프테라노돈','sadFace14','studyFace14'),(400,1000,15,'baseFace15','누구에게나 친절한 공룡입니다.','happyFace15','프테라노돈','sadFace15','studyFace15'),(500,1200,16,'baseFace16','공부를 좋아하지만 잘 하지는 못하는 공룡입니다.','happyFace16','안경 아르젠타비스','sadFace16','studyFace16'),(500,1200,17,'baseFace17','다른 친구들과 함께 하늘을 날고싶어하는 공룡입니다.','happyFace17','뿔 아르젠타비스','sadFace17','studyFace17'),(500,1200,18,'baseFace18','기분이 좋아지면 폴짝폴짝 뛰는 공룡입니다.','happyFace18','아르젠타비스','sadFace18','studyFace18');
/*!40000 ALTER TABLE `dinosaur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dinosaur_book`
--

DROP TABLE IF EXISTS `dinosaur_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dinosaur_book` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `my_dinosaur_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhs21paxcgt0uu7g9ma2qbkbe8` (`my_dinosaur_id`),
  CONSTRAINT `FKhs21paxcgt0uu7g9ma2qbkbe8` FOREIGN KEY (`my_dinosaur_id`) REFERENCES `dinosaur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dinosaur_book`
--

LOCK TABLES `dinosaur_book` WRITE;
/*!40000 ALTER TABLE `dinosaur_book` DISABLE KEYS */;
INSERT INTO `dinosaur_book` VALUES (17,1),(23,1),(24,1),(25,1),(26,1),(27,1),(14,11),(16,13);
/*!40000 ALTER TABLE `dinosaur_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dinosaur_collection`
--

DROP TABLE IF EXISTS `dinosaur_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dinosaur_collection` (
  `dinosaur_book_id` bigint DEFAULT NULL,
  `dinosaur_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FKs819r2o5yq6rb7aglstekerh6` (`dinosaur_id`),
  KEY `FK9w417d2t7mx3nk1gpljg8uvoj` (`dinosaur_book_id`),
  CONSTRAINT `FK9w417d2t7mx3nk1gpljg8uvoj` FOREIGN KEY (`dinosaur_book_id`) REFERENCES `dinosaur_book` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKs819r2o5yq6rb7aglstekerh6` FOREIGN KEY (`dinosaur_id`) REFERENCES `dinosaur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dinosaur_collection`
--

LOCK TABLES `dinosaur_collection` WRITE;
/*!40000 ALTER TABLE `dinosaur_collection` DISABLE KEYS */;
INSERT INTO `dinosaur_collection` VALUES (14,1,55),(16,1,57),(17,1,58),(16,5,64),(14,5,65),(14,3,66),(16,3,67),(16,6,68),(14,6,69),(16,13,70),(14,13,71),(16,12,72),(14,12,73),(23,1,82),(24,1,83),(25,1,84),(26,1,85),(24,3,86),(14,8,87),(24,8,88),(14,17,89),(24,17,90),(24,9,91),(27,1,92),(14,11,93);
/*!40000 ALTER TABLE `dinosaur_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `egg`
--

DROP TABLE IF EXISTS `egg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `egg` (
  `child_check` bit(1) NOT NULL,
  `experience` int DEFAULT NULL,
  `volunteer_check` bit(1) NOT NULL,
  `dinosaur_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FKbjqodrevj0v7ss66c75hfim1y` (`dinosaur_id`),
  CONSTRAINT `FKbjqodrevj0v7ss66c75hfim1y` FOREIGN KEY (`dinosaur_id`) REFERENCES `dinosaur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `egg`
--

LOCK TABLES `egg` WRITE;
/*!40000 ALTER TABLE `egg` DISABLE KEYS */;
INSERT INTO `egg` VALUES (_binary '\0',100,_binary '\0',5,115),(_binary '\0',0,_binary '\0',6,160),(_binary '\0',0,_binary '\0',4,161),(_binary '\0',0,_binary '\0',1,162),(_binary '\0',90,_binary '\0',8,167),(_binary '\0',95,_binary '\0',11,169),(_binary '\0',0,_binary '\0',9,170);
/*!40000 ALTER TABLE `egg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `approved_status` bit(1) DEFAULT NULL,
  `child_center_id` bigint NOT NULL,
  `manager_id` bigint NOT NULL,
  PRIMARY KEY (`manager_id`),
  KEY `FKh845i76hu46fo8wfy1f4ioyhy` (`child_center_id`),
  CONSTRAINT `FK6orb4jiapogwrmfg56hpn0120` FOREIGN KEY (`manager_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKh845i76hu46fo8wfy1f4ioyhy` FOREIGN KEY (`child_center_id`) REFERENCES `child_center` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (_binary '',1,8),(_binary '',1,33),(_binary '\0',6,36),(_binary '\0',4,37);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_image`
--

DROP TABLE IF EXISTS `meeting_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting_image` (
  `meeting_image_id` bigint NOT NULL AUTO_INCREMENT,
  `meeting_schedule_id` bigint DEFAULT NULL,
  `meeting_image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`meeting_image_id`),
  KEY `FKlio9tmhf6eqjf3o6si4fgvtar` (`meeting_schedule_id`),
  CONSTRAINT `FKlio9tmhf6eqjf3o6si4fgvtar` FOREIGN KEY (`meeting_schedule_id`) REFERENCES `meeting_schedule` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_image`
--

LOCK TABLES `meeting_image` WRITE;
/*!40000 ALTER TABLE `meeting_image` DISABLE KEYS */;
INSERT INTO `meeting_image` VALUES (98,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F3?alt=media&token=bc39e36e-8a3b-4c44-8f31-82d493b66f15'),(99,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F2?alt=media&token=db502223-9724-4923-86eb-b282c2835492'),(100,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F20%2F0?alt=media&token=b193da99-291d-450a-9499-3734248bdb0e'),(101,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F20%2F1?alt=media&token=1685c96d-a2ec-49db-9ac0-86ee3180bd2f'),(102,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F6?alt=media&token=33bd1253-8d35-461d-8a6d-86d83404cd9c'),(103,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F7?alt=media&token=4e2d93c6-3be9-4191-a577-0eee13ff034f'),(104,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F5?alt=media&token=ece0ce73-2602-4b1b-b8e5-555c3c237721'),(105,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F4?alt=media&token=102dd9a7-77e6-4a1a-a10a-b48fdd71f9ef'),(106,75,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F7?alt=media&token=96ebcd7e-811c-4f84-be31-5a6088a80dd8'),(107,75,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F6?alt=media&token=c1a773af-a93b-4116-ac14-de7fe3fa373a'),(108,75,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F4?alt=media&token=cb1db344-8f19-4db0-a274-dfb8a11300a8'),(109,75,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F2?alt=media&token=6b773814-0039-494b-9c71-001ef58ea7d3'),(110,75,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F3?alt=media&token=69ede52c-703f-4512-97a9-2b0b69ed0f5c'),(111,75,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F5?alt=media&token=8be885bf-53ad-4986-ab84-e946c8857186'),(112,76,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F76%2F17%2F12?alt=media&token=8543b3f7-3cdd-4c26-a456-a26d6dfa3a66'),(113,76,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F76%2F17%2F11?alt=media&token=76048fe5-7d98-47b1-8a75-c74e682dd3db'),(114,77,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F77%2F19%2F0?alt=media&token=9d3e63c7-5831-4b7f-849f-cd393388776d'),(115,77,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F77%2F17%2F14?alt=media&token=ae830132-a9ac-4bde-b1a9-bb5235adee5f'),(116,77,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F77%2F17%2F13?alt=media&token=d0b33a0d-2056-4468-8d0d-fe77edce10ee'),(117,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F11?alt=media&token=df5b4a74-7bd9-488b-be29-33b2bf894a21'),(118,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F12?alt=media&token=87d20d10-ddff-4a5f-9f62-228cfbb019a4'),(119,71,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F14?alt=media&token=c99a9e54-eb9a-451f-ac5d-1e066de90371'),(120,78,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F78%2F17%2F1?alt=media&token=36a13781-2c7b-4b77-88f5-82fea369450a'),(121,78,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F78%2F19%2F15?alt=media&token=908f1094-3052-4a02-b4fc-3f62b64fa571'),(122,78,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F78%2F19%2F16?alt=media&token=de1f6bac-2f8a-4b65-a688-6ad9a9028903'),(123,79,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F79%2F17%2F17?alt=media&token=965407a3-7e22-45e1-8d53-4c002fa69937'),(124,79,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F79%2F17%2F18?alt=media&token=09f0194f-6b49-4c45-9ca5-dddb2ca209b4'),(125,79,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F79%2F17%2F19?alt=media&token=1b03aa6c-8b91-4d6f-b123-8e99e50a59c4'),(126,81,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F81%2F17%2F21?alt=media&token=b505c665-0a56-44fb-8a29-30e467e00c4b'),(127,81,'https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F81%2F17%2F20?alt=media&token=f78f49f7-7d52-4100-8762-4a0d2ac045f3');
/*!40000 ALTER TABLE `meeting_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_schedule`
--

DROP TABLE IF EXISTS `meeting_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting_schedule` (
  `activity_log_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `relation_id` bigint DEFAULT NULL,
  `scheduled_end_time` datetime(6) DEFAULT NULL,
  `scheduled_start_time` datetime(6) DEFAULT NULL,
  `meeting_url` varchar(255) DEFAULT NULL,
  `thumbnail_img_path` varchar(255) DEFAULT NULL,
  `status` enum('SCHEDULED','OPENED','CLOSED') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hta1a54b2we4wcxllrom6rfip` (`activity_log_id`),
  KEY `FKpsl8y4pxbxnv3qln4eb49epmy` (`relation_id`),
  CONSTRAINT `FKo6sgpxkmfpb4tt3v2gxs79sgl` FOREIGN KEY (`activity_log_id`) REFERENCES `activity_log` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKpsl8y4pxbxnv3qln4eb49epmy` FOREIGN KEY (`relation_id`) REFERENCES `relation` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_schedule`
--

LOCK TABLES `meeting_schedule` WRITE;
/*!40000 ALTER TABLE `meeting_schedule` DISABLE KEYS */;
INSERT INTO `meeting_schedule` VALUES (71,71,150,'2024-02-15 18:30:00.000000','2024-02-15 16:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F7?alt=media&token=4e2d93c6-3be9-4191-a577-0eee13ff034f','CLOSED'),(72,72,153,'2024-02-01 18:30:00.000000','2024-02-01 16:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F7?alt=media&token=4e2d93c6-3be9-4191-a577-0eee13ff034f','CLOSED'),(73,73,153,'2024-02-06 18:30:00.000000','2024-02-06 16:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F7?alt=media&token=4e2d93c6-3be9-4191-a577-0eee13ff034f','CLOSED'),(74,74,153,'2024-02-09 18:30:00.000000','2024-02-09 16:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F71%2F17%2F7?alt=media&token=4e2d93c6-3be9-4191-a577-0eee13ff034f','CLOSED'),(75,75,152,'2024-02-14 17:30:00.000000','2024-02-14 15:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F75%2F17%2F6?alt=media&token=c1a773af-a93b-4116-ac14-de7fe3fa373a','CLOSED'),(76,76,153,'2024-02-15 19:30:00.000000','2024-02-15 18:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F76%2F17%2F11?alt=media&token=76048fe5-7d98-47b1-8a75-c74e682dd3db','CLOSED'),(77,77,152,'2024-02-01 20:00:00.000000','2024-02-01 19:00:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F77%2F17%2F13?alt=media&token=d0b33a0d-2056-4468-8d0d-fe77edce10ee','CLOSED'),(78,78,152,'2024-02-02 19:00:00.000000','2024-02-02 18:00:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F78%2F19%2F16?alt=media&token=de1f6bac-2f8a-4b65-a688-6ad9a9028903','CLOSED'),(79,79,152,'2024-02-06 20:00:00.000000','2024-02-06 19:00:00.000000','meetingUrl','defaultThumbnailImgPath','CLOSED'),(80,80,152,'2024-02-10 20:00:00.000000','2024-02-10 19:00:00.000000','meetingUrl','defaultThumbnailImgPath','CLOSED'),(81,81,152,'2024-02-15 20:30:00.000000','2024-02-15 19:30:00.000000','meetingUrl','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/meeting_image%2F81%2F17%2F21?alt=media&token=b505c665-0a56-44fb-8a29-30e467e00c4b','CLOSED');
/*!40000 ALTER TABLE `meeting_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `birth` date NOT NULL,
  `dinosaur_book_id` bigint DEFAULT NULL,
  `enter_date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `profile_img_path` varchar(255) DEFAULT NULL,
  `member_type` enum('CHILD','VOLUNTEER','MANAGER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ihtf7ds8chbkg34hl3kcehn4b` (`dinosaur_book_id`),
  CONSTRAINT `FKht7ni1tpw9tn3fh2ogxgpeamg` FOREIGN KEY (`dinosaur_book_id`) REFERENCES `dinosaur_book` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('1111-11-11',NULL,'2024-02-07 12:45:09.561572',8,'test10@test.com','okmanager','$2a$10$w6ndnuzZdHNZUyX30RFBIO9m9iUOko8gwzCA7qzkPD.PpRYuhKT1m','111-1111-1111','no_profile.jpg','MANAGER'),('1990-11-22',14,'2024-02-13 14:26:40.564027',17,'ok@ssafy.com','옥세훈','$2a$10$x40rYtxRBWhBWXIT2kp3.uw9X.4mKUAjwlgsd32UNtvF6DH7CRGUi','010-1234-5678','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/user_image%2F17?alt=media&token=67d94f16-7154-4bf0-a5c9-2093a132b1c6','VOLUNTEER'),('2016-02-24',16,'2024-02-13 14:28:25.163634',19,'park@ssafy.com','박주헌','$2a$10$xxMAqcfgXJifryqT/XZQVu9hhnPxblTsCUFy.obRwQ.33YyBTmRAG','010-1234-5678','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/user_image%2F19?alt=media&token=0b6a27a2-2a73-4b8a-bd64-4fd8bfed53a0','CHILD'),('2016-03-07',17,'2024-02-13 14:30:35.845775',20,'lee@ssafy.com','이형욱','$2a$10$rwiH9vRCqjmLTICEMCJVK..BsIxa72L9HegqQegrfvdE1GGZ8jHpS','010-1234-5678','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/user_image%2F20?alt=media&token=b7723809-990d-46c5-858e-bb9863dbc722','CHILD'),('2015-06-16',23,'2024-02-15 03:13:23.016155',30,'kang@test.com','강성은','$2a$10$4UHb5FdKsysk3CBYTF8CIOAR7NtOMZt/XBl40s451YAcB5BaORct2','010-1234-1234','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/user_image%2F30?alt=media&token=b3d84dda-96ef-4a0f-90d4-48363a7b5300','CHILD'),('2016-03-10',24,'2024-02-15 03:32:45.667082',31,'jeon@ssafy.com','전은희','$2a$10$k0fX0Wd6s3UMxSHt0H4j2O7t13gpvDTs05OFo97DvyOYi03vTI7by','010-1234-5678','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/user_image%2F31?alt=media&token=19f9be1d-0cf1-4515-8b86-71b2306a32b4','CHILD'),('1991-02-26',NULL,'2024-02-15 04:46:27.508329',33,'jo@ssafy.com','조혜원','$2a$10$ZSvojjEkbPCS6TjVZIvb8uQvh.Z3Qk93kGtSseCyocXKf5qq3yLOS','010-1234-5678','no_profile.jpg','MANAGER'),('2020-10-06',25,'2024-02-15 05:30:55.796826',34,'hw@ssafy.com','안성호','$2a$10$lDY9Z9kOZO7xDSGMKQAY1O5qF32Z/3b5taDCScy9snk6lULvoPl.6','123-4567-8910','https://firebasestorage.googleapis.com/v0/b/st-project-3c625.appspot.com/o/user_image%2F34?alt=media&token=c21ac8c3-667c-4fc3-bb96-9d932940322c','VOLUNTEER'),('2019-11-15',26,'2024-02-15 05:32:14.324076',35,'hws@ssafy.com','조혜원','$2a$10$PznwcZzxhMGzrj2pzBXzjuoEjgDsf2BCc/C8yBTtypqpcqUn9VUzK','010-6362-9034','no_profile.jpg','CHILD'),('2024-02-06',NULL,'2024-02-15 07:06:46.601446',36,'jin@naver.com','홍준표','$2a$10$NJrzqlNnVMU7fgy0X.EMkeiSxfk34oLubb3dSXyAQ4JM/Ot25NX4m','112','no_profile.jpg','MANAGER'),('2024-01-31',NULL,'2024-02-15 07:07:24.333346',37,'aaa@naver.com','ㅂㅈㄷ','$2a$10$NHQoJ8ujxkBmdob0Vj3FnOS5mqM6Hnym9dDWWa5rCRH3bepoMKMXe','111','no_profile.jpg','MANAGER'),('2024-02-06',27,'2024-02-15 08:40:21.546601',38,'a@naver.com','dfd','$2a$10$j/mz/3OX9apXotatMqlUkONihKVQfwK/jADp5fyn6SsJbL4zOCefK','010','no_profile.jpg','CHILD');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relation`
--

DROP TABLE IF EXISTS `relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relation` (
  `child_center_id` bigint DEFAULT NULL,
  `child_id` bigint DEFAULT NULL,
  `egg_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `volunteer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `VOLUNTEER_CHILD_UNIQUE` (`volunteer_id`,`child_id`),
  UNIQUE KEY `UK_6xs9f5c2yimruetg43uj0h8rp` (`egg_id`),
  KEY `FKbuag54ia1q81pbprjpcr75pia` (`child_center_id`),
  KEY `FKkg0ril4niq9baq392b19y1yjm` (`child_id`),
  CONSTRAINT `FK6oy0ul2a5re63rjukd9ls3l5j` FOREIGN KEY (`egg_id`) REFERENCES `egg` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKbuag54ia1q81pbprjpcr75pia` FOREIGN KEY (`child_center_id`) REFERENCES `child_center` (`id`),
  CONSTRAINT `FKkg0ril4niq9baq392b19y1yjm` FOREIGN KEY (`child_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKsa99ge3sreaagw7v6kiureyap` FOREIGN KEY (`volunteer_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation`
--

LOCK TABLES `relation` WRITE;
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;
INSERT INTO `relation` VALUES (1,19,160,143,34),(1,31,161,144,34),(1,30,162,145,34),(1,20,167,150,17),(1,19,169,152,17),(1,31,170,153,17);
/*!40000 ALTER TABLE `relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer` (
  `volunteer_time` int DEFAULT NULL,
  `volunteer_id` bigint NOT NULL,
  PRIMARY KEY (`volunteer_id`),
  CONSTRAINT `FKile0puubgnoi7awtxactuedyv` FOREIGN KEY (`volunteer_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer`
--

LOCK TABLES `volunteer` WRITE;
/*!40000 ALTER TABLE `volunteer` DISABLE KEYS */;
INSERT INTO `volunteer` VALUES (20,17),(0,34);
/*!40000 ALTER TABLE `volunteer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whisper`
--

DROP TABLE IF EXISTS `whisper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whisper` (
  `read_status` bit(1) NOT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `relation_id` bigint DEFAULT NULL,
  `writer_id` bigint DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2haj2pxqr5goent8mnqq7koeb` (`writer_id`),
  KEY `FK8rs08pkwrvqes6a5cwpix10a0` (`relation_id`),
  CONSTRAINT `FK2haj2pxqr5goent8mnqq7koeb` FOREIGN KEY (`writer_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK8rs08pkwrvqes6a5cwpix10a0` FOREIGN KEY (`relation_id`) REFERENCES `relation` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whisper`
--

LOCK TABLES `whisper` WRITE;
/*!40000 ALTER TABLE `whisper` DISABLE KEYS */;
INSERT INTO `whisper` VALUES (_binary '\0','2024-02-15 07:35:12.349669',67,153,17,'은희야 오늘은 좋은 하루 보냈니?'),(_binary '\0','2024-02-15 07:35:24.765452',68,153,31,'네 선생님! 선생님은요?'),(_binary '\0','2024-02-15 07:55:17.688711',69,152,17,'오늘 하루는 어땠니?'),(_binary '\0','2024-02-15 07:55:29.167628',70,152,19,'너무 즐거웠어요!'),(_binary '\0','2024-02-15 07:56:09.758581',71,152,19,'선생님 또 언제 볼 수 잇어요?'),(_binary '\0','2024-02-15 08:02:03.423638',72,152,17,'다음주 화요일에 볼까?'),(_binary '\0','2024-02-15 08:02:13.976558',73,152,19,'좋아요!'),(_binary '\0','2024-02-15 08:13:15.845730',74,152,17,'주헌아 안녕?'),(_binary '\0','2024-02-15 08:13:17.787143',75,152,19,'안녕하세요'),(_binary '\0','2024-02-15 08:14:18.086313',76,152,17,'주헌아, 오늘 수업 어땠어??'),(_binary '\0','2024-02-15 08:14:20.324862',77,152,19,'오늘 수업 너무 재미있었어요!'),(_binary '\0','2024-02-15 08:15:47.543932',78,152,17,'어떤게 제일 재밌었어??'),(_binary '\0','2024-02-15 08:15:48.167967',79,152,19,'카드 뒤집기가 제일 재미있었어요! 다음에 또 하고 싶어요!'),(_binary '\0','2024-02-15 08:45:08.333282',80,152,17,'즐거웠다니 행복하구나'),(_binary '\0','2024-02-15 08:46:11.115633',81,152,17,'오늘은 무슨일이 있었니?'),(_binary '\0','2024-02-15 08:46:34.510134',82,152,19,'오늘은 친구들과 축구했어요!');
/*!40000 ALTER TABLE `whisper` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 20:33:30
