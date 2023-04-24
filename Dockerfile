FROM node:16

WORKDIR /app

COPY ./dist .

EXPOSE 8080

CMD ["node", "server.js"]