FROM node:16

WORKDIR /app

COPY . .

RUN npm install

RUN echo "10.0.4.6 nc.inplay.space" >> /etc/hosts

EXPOSE 8080

CMD ["node", "./dist/server.js"]