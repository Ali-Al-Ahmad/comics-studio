FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY  . .

COPY .env.example .env

EXPOSE 4000

CMD [ "node","server.js" ]
