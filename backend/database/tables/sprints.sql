CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;
CREATE TABLE IF NOT EXISTS `sprints` (
  `sprint_id` int NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`sprint_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `sprints_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`)
);