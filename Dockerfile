# syntax=docker/dockerfile:1.2
FROM node:16
LABEL org.opencontainers.image.media-type="application/vnd.docker.distribution.manifest.v2+json"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "./dist/server.js"]