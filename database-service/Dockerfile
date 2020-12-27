FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD example-password
ENV MYSQL_DATABASE GD_DB  
ENV MYSQL_USER uexample  
ENV MYSQL_PASSWORD example-password
ENV MYSQL_DATABASE_HOST db


ADD setup.sql /docker-entrypoint-initdb.d
