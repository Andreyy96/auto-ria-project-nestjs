FROM node:20-alpine

MAINTAINER Some Dev

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .



#FROM node:20-alpine
#
#MAINTAINER Some Dev
#
#RUN mkdir /app
#WORKDIR /app
#
#COPY ./package.json /app
#COPY ./tsconfig.json /app
#
#RUN npm i