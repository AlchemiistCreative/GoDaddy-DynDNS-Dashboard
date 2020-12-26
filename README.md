# GoDaddy-DynDNS-Dashboard

DynDNS API Based.

## Usage

Connect to a MySQL DB with this config:

You can change DB settings in config/db.js.

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
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `apikey` varchar(255) DEFAULT NULL,
  `secretkey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

```

## Install these NPM packages:

```bash
  npm install request-promise public-ip node-schedule express-session express mysql ejs --save
```
