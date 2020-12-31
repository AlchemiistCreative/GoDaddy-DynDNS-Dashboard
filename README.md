# GoDaddy-DynDNS-Dashboard

DynDNS API Based.

Automatically modify records of multiple domains hosted on Godaddy with your own Public IP.

## Usage

Connect to a MySQL DB with this config:

You can change DB settings in config/db.js.

```SQL

CREATE DATABASE GD_DB;
USE GD_DB;

CREATE TABLE config 
(
  id INT PRIMARY KEY AUTO_INCREMENT,
  ip varchar(255),
  schedule varchar(255),
  apikey varchar(255),
  secretkey varchar(255)
); 

CREATE TABLE main
 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  domain varchar(255),
  content varchar(255),
  types varchar(255)
);

```

## Install these NPM packages:

```bash
  npm install request request-promise public-ip node-schedule express-session express mysql ejs --save
```

## Usage with Docker
### Docker-compose available in [docker branch](https://github.com/AlchemiistCreative/GoDaddy-DynDNS-Dashboard/tree/docker).

```
docker-compose up -d
```


