CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;

CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(255) NOT NULL,
  `task_priority` enum('high','low','medium') NOT NULL,
  `task_status` enum('pending','in progress','completed','hold') DEFAULT NULL,
  `task_dueDate` date NOT NULL,
  `employee_id` int NOT NULL,
  `sprint_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `employee_id` (`employee_id`),
  KEY `sprint_id` (`sprint_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`sprint_id`)
);
