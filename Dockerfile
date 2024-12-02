FROM node:20-alpine

MAINTAINER Some Dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN #npm run build