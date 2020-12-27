FROM node:latest

ADD wait-for-it.sh /wait-for-it.sh
ADD start.sh /start.sh
RUN apt-get update && apt-get -y dist-upgrade
RUN apt install -y netcat
RUN chmod 755 /start.sh
RUN chmod 755 /wait-for-it.sh

CMD ["/wait-for-it.sh", "db:33060", "--", "/start.sh"]


