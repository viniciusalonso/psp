FROM node:8.16.1-jessie

WORKDIR app

ADD . .
COPY config/config.json.example config/config.json

RUN npm install
