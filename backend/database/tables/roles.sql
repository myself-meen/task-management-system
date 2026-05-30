CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;
CREATE TABLE IF NOT EXISTS`roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ;