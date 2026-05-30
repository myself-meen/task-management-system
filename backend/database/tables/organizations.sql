CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;
CREATE TABLE IF NOT EXISTS`organizations` (
  `organization_id` int NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(255) NOT NULL,
  PRIMARY KEY (`organization_id`)
);