CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;
CREATE TABLE IF NOT EXISTS`project_members` (
  `project_member_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`project_member_id`),
  KEY `project_id` (`project_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `project_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `project_members_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
);