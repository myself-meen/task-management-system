CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;
CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(255) NOT NULL,
  `employee_mail` varchar(255) NOT NULL,
  `organization_id` int NOT NULL,
  PRIMARY KEY (`employee_id`),
  FULLTEXT KEY `ft_idx_employee_name` (`employee_name`),
  UNIQUE KEY `employee_mail` (`employee_mail`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`organization_id`)
);