<p align="center">
  <a href="https://www.ig.com.br" target="blank"><img src="https://i0.statig.com.br/sass-canais/ig/images/home/logo_iguinho_home.png" width="120" alt="Portal iG Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"><a href="https://www.ig.com.br" target="_blank">Portal iG</a> is one of the largest news and content portals in the country. It was a pioneer in the democratization of the internet and currently has more than 39 million unique monthly visitors.</p>
    <p align="center">


  <a href="https://twitter.com/iG" target="_blank"><img src="https://img.shields.io/twitter/follow/iG?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Backend Carnival Clearance](https://github.com/Portal-iG/o-dia-backend-apuracao-carnaval) backend api carnival calculation repository - Portal iG and O Dia.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Build Docker

```bash
# Build docker whith docker-compose
$ docker-compose up --build -d
```

## Host Production

- Server - [Balder](https://service.ig.com.br/apuracao-carnaval-bknd/)
```bash
https://service.ig.com.br/apuracao-carnaval-bknd/
```

## Routes Documentation

- Documentation of routes via swagger: - [Documentation](https://service.ig.com.br/apuracao-carnaval-bknd/api/)

## Deploy

Access the Balder server via ssh terminal:

```bash
# Balder ssh access
$ ssh -i ~/.ssh/chave_ig.pem ubuntu@10.0.35.122
```

<br>

Enter the folder where the app is located:

```bash
# Command to enter the project folder inside the server
$ cd /deploy/VAR/dominios/o-dia-backend-apuracao-carnaval/ 
```

<br>

Run the git pull on the main branch:

```bash
# Pull in the repository
$ git pull origin main
```

<br>

Build docker via docker compose command:

```bash
# Docker Compose Command
$ docker-compose -up --build -d
```


## Stay in touch

- Author - [Fernando Castilho](https://github.com/CastilhoF)
- Author - [William Mendes](https://github.com/WillianMendes)
- Website - [https://www.ig.com.br](https://www.ig.com.br)
- Twitter - [@iG](https://twitter.com/iG)

