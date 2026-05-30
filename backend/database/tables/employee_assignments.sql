CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;
CREATE TABLE IF NOT EXISTS `employee_assignments` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `department_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `employee_id` (`employee_id`),
  KEY `department_id` (`department_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `employee_assignments_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `employee_assignments_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `employee_assignments_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
);