#!/usr/bin/env bash

chown -R www-data:www-data /usr/src/app
chown -R root:root /usr/src/app

mkdir -p /var/log/application && \
chmod -R 777 /var/log/application
chown -R www-data:www-data /var/log/application && \

npm install

npm run sandbox