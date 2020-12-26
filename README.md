# GoDaddy-DynDNS-Dashboard

DynDNS API Based.

## Usage
#SQL

```sql

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `GD_DB` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `GD_DB`;
DROP TABLE IF EXISTS `main`;
CREATE TABLE `main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `types` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


```
