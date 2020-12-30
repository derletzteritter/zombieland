CREATE DATABASE zombieland
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

CREATE TABLE zombieland.players (
  identifier varchar(255) NOT NULL,
  player_name varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT '{"x":-269.4, "y":-955.3, "z":-31.2}',
  account int(11) DEFAULT NULL,
  role varchar(255) NOT NULL DEFAULT 'user',
  PRIMARY KEY (identifier)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;