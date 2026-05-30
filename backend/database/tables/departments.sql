CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;

CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) NOT NULL,
  `organization_id` int NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `department_name` (`department_name`,`organization_id`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`organization_id`)
);