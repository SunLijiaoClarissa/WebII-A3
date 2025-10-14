/*
Navicat MySQL Data Transfer

Source Server         : myql8.0
Source Server Version : 80033
Source Host           : localhost:3307
Source Database       : charityevents_db

Target Server Type    : MYSQL
Target Server Version : 80033
File Encoding         : 65001

Date: 2025-10-03 17:08:35
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
  `target` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
INSERT INTO `events` VALUES ('1', 'Hope Elementary Scholarship Ceremony', 'Annual scholarship awards for underprivileged students to encourage continued education', '2025-09-15', '2025-09-25', 'Beijing', '1', '2', '0.00', 'Underprivileged students, educators', '1');
INSERT INTO `events` VALUES ('2', 'Rural Teacher Development Training', 'Professional training courses to enhance teaching capabilities of rural educators', '2025-10-20', '2025-11-01', 'New York City', '5', '5', '0.00', 'Rural teachers, education volunteers', '1');
INSERT INTO `events` VALUES ('3', 'Love Book Corner Initiative', 'Establishing reading corners in remote schools and donating children\'s books', '2025-11-05', '2025-11-25', 'Shanghai', '2', '1', '0.00', 'School-age children, librarians', '0');
INSERT INTO `events` VALUES ('4', 'Special Education Equipment Donation', 'Donating rehabilitation equipment and teaching tools to special education schools', '2025-10-30', '2025-11-30', 'Chongqing', '4', '4', '0.00', 'Special needs children, special education teachers', '1');
INSERT INTO `events` VALUES ('5', 'Computer Classroom Launch Ceremony', 'Equipping rural schools with computer classrooms and network equipment', '2025-12-10', '2025-12-31', 'Guangzhou', '3', '3', '0.00', 'Primary and secondary students, IT teachers', '1');
INSERT INTO `events` VALUES ('6', 'Medical Assistance for Poor Areas', 'Organizing medical experts to provide free clinics for residents in poor areas', '2025-09-25', '2025-10-25', 'Chicago', '6', '6', '0.00', 'Poor patients, community residents', '1');
INSERT INTO `events` VALUES ('7', 'Winter Warmth Package Distribution', 'Distributing winter supplies and warmth packages to poor families', '2025-11-20', '2025-12-20', 'Paris', '7', '7', '0.00', 'Poor families, left-behind children', '0');
INSERT INTO `events` VALUES ('8', 'Urban Greening Tree Planting', 'Organizing volunteers for urban greening construction and tree planting', '2025-09-12', '2025-10-12', 'Hong Kong', '8', '8', '0.00', 'Environmental volunteers, community residents', '1');
INSERT INTO `events` VALUES ('9', 'Stray Animal Rescue', 'Finding adoptive families for stray animals and promoting animal protection', '2025-09-08', '2025-10-08', 'Liuzhou', '9', '9', '0.00', 'Animal lovers, potential adopters', '1');
INSERT INTO `events` VALUES ('10', 'Flood Relief Material Distribution', 'Distributing emergency relief materials to residents in flood-stricken areas', '2025-08-15', '2025-09-15', 'Wuhan', '10', '10', '0.00', 'Disaster area residents, rescue personnel', '1');

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
