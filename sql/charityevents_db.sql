/*
Navicat MySQL Data Transfer

Source Server         : myql8.0
Source Server Version : 80033
Source Host           : localhost:3307
Source Database       : charityevents_db

Target Server Type    : MYSQL
Target Server Version : 80033
File Encoding         : 65001

Date: 2025-10-17 22:15:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', 'Education Support');
INSERT INTO `categories` VALUES ('2', 'Scholarship Programs');
INSERT INTO `categories` VALUES ('3', 'School Construction');
INSERT INTO `categories` VALUES ('4', 'Special Education');
INSERT INTO `categories` VALUES ('5', 'Teacher Training');
INSERT INTO `categories` VALUES ('6', 'Medical Assistance');
INSERT INTO `categories` VALUES ('7', 'Poverty Relief');
INSERT INTO `categories` VALUES ('8', 'Environmental Protection');
INSERT INTO `categories` VALUES ('9', 'Animal Protection');
INSERT INTO `categories` VALUES ('10', 'Disaster Relief');

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organizer_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT NULL,
  `target` decimal(10,2) DEFAULT NULL,
  `current_amount` decimal(10,2) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organizer_id` (`organizer_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `organizations` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES ('1', 'Hope Elementary Scholarship Ceremony', 'Annual scholarship awards for underprivileged students to encourage continued education', '2025-09-15', '2025-09-25', 'Beijing', '1', '2', '200.00', '10000.00', '600.00', '1');
INSERT INTO `events` VALUES ('2', 'Rural Teacher Development Training', 'Professional training courses to enhance teaching capabilities of rural educators', '2025-10-20', '2025-11-01', 'New York City', '5', '5', '355.00', '10000.00', '355.00', '1');
INSERT INTO `events` VALUES ('3', 'Love Book Corner Initiative', 'Establishing reading corners in remote schools and donating children\'s books', '2025-11-05', '2025-11-25', 'Shanghai', '2', '1', '458.00', '10000.00', '458.00', '0');
INSERT INTO `events` VALUES ('4', 'Special Education Equipment Donation', 'Donating rehabilitation equipment and teaching tools to special education schools', '2025-10-30', '2025-11-30', 'Chongqing', '4', '4', '235.00', '10000.00', '235.00', '1');
INSERT INTO `events` VALUES ('5', 'Computer Classroom Launch Ceremony', 'Equipping rural schools with computer classrooms and network equipment', '2025-12-10', '2025-12-31', 'Guangzhou', '3', '3', '268.00', '10000.00', '268.00', '1');
INSERT INTO `events` VALUES ('6', 'Medical Assistance for Poor Areas', 'Organizing medical experts to provide free clinics for residents in poor areas', '2025-09-25', '2025-10-25', 'Chicago', '6', '6', '277.00', '10000.00', '227.00', '1');
INSERT INTO `events` VALUES ('7', 'Winter Warmth Package Distribution', 'Distributing winter supplies and warmth packages to poor families', '2025-11-20', '2025-12-20', 'Paris', '7', '7', '3282.00', '10000.00', '3282.00', '0');
INSERT INTO `events` VALUES ('8', 'Urban Greening Tree Planting', 'Organizing volunteers for urban greening construction and tree planting', '2025-09-12', '2025-10-12', 'Hong Kong', '8', '8', '1587.00', '10000.00', '1587.00', '1');
INSERT INTO `events` VALUES ('9', 'Stray Animal Rescue', 'Finding adoptive families for stray animals and promoting animal protection', '2025-09-08', '2025-10-08', 'Liuzhou', '9', '9', '2184.00', '10000.00', '2184.00', '1');
INSERT INTO `events` VALUES ('10', 'Flood Relief Material Distribution', 'Distributing emergency relief materials to residents in flood-stricken areas', '2025-08-15', '2025-09-15', 'Wuhan', '10', '10', '69.00', '10000.00', '69.00', '1');

-- ----------------------------
-- Table structure for organizations
-- ----------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of organizations
-- ----------------------------
INSERT INTO `organizations` VALUES ('1', 'Hope Project Foundation', 'aaa@163.com');
INSERT INTO `organizations` VALUES ('2', 'Sunshine Education Assistance Program', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('3', 'Rural Education Revitalization Association', 'aaa@163.com');
INSERT INTO `organizations` VALUES ('4', 'Special Education Care Center', 'aaa@163.com');
INSERT INTO `organizations` VALUES ('5', 'Teacher Development Foundation', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('6', 'Loving Medical Assistance Association', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('7', 'Poverty Alleviation Foundation', 'bbb@126.com');
INSERT INTO `organizations` VALUES ('8', 'Green Earth Environmental Organization', '111@qq.com');
INSERT INTO `organizations` VALUES ('9', 'Animal Protection Alliance', '111@outlook.com');
INSERT INTO `organizations` VALUES ('10', 'Disaster Relief Emergency Center', 'test@outlook.com');

-- ----------------------------
-- Table structure for registrations
-- ----------------------------
DROP TABLE IF EXISTS `registrations`;
CREATE TABLE `registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contact_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `registration_date` date NOT NULL,
  `ticket_quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_registration` (`event_id`,`user_email`),
  CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of registrations
-- ----------------------------
INSERT INTO `registrations` VALUES ('1', '1', 'Alice Smith', 'alice@example.com', '08612345678', '2025-10-01', '2');
INSERT INTO `registrations` VALUES ('2', '1', 'Bob Johnson', 'bob@example.com', '08612345679', '2025-10-02', '1');
INSERT INTO `registrations` VALUES ('3', '1', 'Carol Lee', 'carol@example.com', '08612345680', '2025-10-03', '3');
INSERT INTO `registrations` VALUES ('4', '2', 'David Brown', 'david@example.com', '08612345681', '2025-10-04', '1');
INSERT INTO `registrations` VALUES ('5', '2', 'Eva Davis', 'eva@example.com', '08612345682', '2025-10-05', '2');
INSERT INTO `registrations` VALUES ('6', '3', 'Frank Wilson', 'frank@example.com', '08612345683', '2025-10-06', '1');
INSERT INTO `registrations` VALUES ('7', '3', 'Grace Miller', 'grace@example.com', '08612345684', '2025-10-07', '1');
INSERT INTO `registrations` VALUES ('8', '4', 'Henry Taylor', 'henry@example.com', '08612345685', '2025-10-08', '2');
INSERT INTO `registrations` VALUES ('9', '5', 'Irene Clark', 'irene@example.com', '0862345686', '2025-10-09', '1');
INSERT INTO `registrations` VALUES ('10', '5', 'Jack White', 'jack@example.com', '08612345687', '2025-10-10', '2');
