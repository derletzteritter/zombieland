CREATE DATABASE zombieland
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

CREATE TABLE zombieland.players (
  identifier varchar(255) NOT NULL,
  player_name varchar(255) DEFAULT NULL,
  PRIMARY KEY (identifier)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;