--Drop wagerbuddy_DB if it exists currently--
DROP DATABASE IF EXISTS wagerbuddy_DB;

--Create the DB--
CREATE DATABASE wagerbuddy_DB;

--
-- USE wagerbuddy_DB;

-- CREATE TABLE users(
--   id INT NOT NULL AUTO_INCREMENT,
--   nickname varchar(500) NOT NULL,
--   email varchar(500) DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE wagers(
--   id INT NOT NULL AUTO_INCREMENT,
--   title varchar(500) DEFAULT NULL,
--   terms varchar(500) DEFAULT NULL,
--   stakes varchar(500) DEFAULT NULL,
--   settledate date DEFAULT NULL,
--   player1 int(11) NOT NULL,
--   player2 int(11) DEFAULT NULL,
--   player1win tinyint(1) DEFAULT '0',
--   player2win tinyint(1) DEFAULT '0',
--   player1welch tinyint(1) DEFAULT '0',
--   player2welch tinyint(1) DEFAULT '0',
--   betdate date DEFAULT NULL,
--   player2name varchar(500) DEFAULT NULL,
--   PRIMARY KEY (id)
-- );
--