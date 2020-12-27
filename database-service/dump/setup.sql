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

