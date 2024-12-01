<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

### User

User can do the following:

- get me;
- update (name, phone);
- remove his account;
- upload avatar and delete avatar;
- create car, if you have a premium account you can create an unlimited number of cars;
- remove and sell car !!!only your cars;
- upload and delete car image !!!only your cars;
- get statistic (count views by week, month and year, average price of the model by country and region);
- send email manager about add brand to list;


### Admin

Admin can do the following:

- get me;
- remove his account;
- upload avatar and delete avatar;
- sign-up manager;
- banned and unbanned user;
- add brand to list;
- activate and disable car by id;
- remove car by id;

### Manager

Manager can do the following:

- get me;
- remove his account;
- upload avatar and delete avatar;
- banned and unbanned user;
- add brand to list;
- get list no active car;
- activate and disable car by id;
- remove car by id;

### Car

- when creating a car, the price in foreign currency (EUR, USD) is converted into hryvnia and returned with the exchange rate;
- if you fail to create an ad 3 times, it will go into inactive status;

### Cron 

Announcements created in foreign currency are updated at the private bank rate every day at 4 am



## Installation

```bash
#install all dependencies and dev dependencies in package.json
$ npm install
```

## Env File

- create local.env in environments folder,
- copy and fill environment variables from example.local.env

## Running the app

```bash
# docker
$ npm run start:docker:local

# watch mode
$ npm run start:local
```
## Test
```bash
# unit tests
$ npm run test:unit
```

