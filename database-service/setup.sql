CREATE TABLE `main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `types` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `apikey` varchar(255) DEFAULT NULL,
  `secretkey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

ENGINE=InnoDB DEFAULT CHARSET=utf8;

