FROM node:16.13.2

RUN mkdir -p /var/log/application/proxy_manager_sandbox

WORKDIR /usr/src/app

COPY . /usr/src/app

COPY sandbox/bin/start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh

EXPOSE 80

CMD [ "/usr/local/bin/start.sh"]