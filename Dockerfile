# syntax=docker/dockerfile:1.2
FROM node:16

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "./dist/server.js"]