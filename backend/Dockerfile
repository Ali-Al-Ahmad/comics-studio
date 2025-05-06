FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY  . .

EXPOSE 4000

CMD [ "node","server.js" ]
