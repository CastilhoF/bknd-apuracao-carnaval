<p align="center">
  <a href="https://github.com/Hone-Code" target="blank"><img src="https://i.imgur.com/ISZEmfG.png" width="720" alt="Honey Code Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"><a href="https://github.com/Hone-Code" target="_blank">Honey Code</a> is an organization created in 2022 focused on developing on-demand software. Here we make it happen. As we always say: growth, development and coffe forever</p>
    <p align="center">


  <a href="https://twitter.com/CastilhoWylde" target="_blank"><img src="https://img.shields.io/twitter/follow/CastilhoWylde?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Backend Carnival Clearance](https://github.com/Portal-iG/o-dia-backend-apuracao-carnaval) backend api carnival calculation repository.

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

- Server - [Balder](https://bknd-carnival-clearance.herokuapp.com/)
```bash
https://bknd-carnival-clearance.herokuapp.com/
```

## Routes Documentation

<br>

- Documentation of routes via swagger: - [Documentation]()

<br>

<a href="https://bknd-carnival-clearance.herokuapp.com/api/" target="_blank"><img  width="320" src=https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg></a>

<br>

## Deploy on Heroku Container With Heroku CLI

First you will need to build the api in local docker, that is, on your computer.

```bash
# Build docker whith docker-compose
$ docker-compose up --build -d
```

<br>

Now follow the steps via heroku cli

```bash
# If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
$ heroku login
```
Log in to Container Registry

```bash
# You must have Docker set up locally to continue. You should see output when you run this command.
$ docker ps

# Now you can sign into Container Registry.
$ heroku container:login
```
Push your Docker-based app
```bash
# Build the Dockerfile in the current directory and push the Docker image.
$ heroku container:push web -a "app-name-on-heroku"
```

Deploy the changes
```bash
# Release the newly pushed images to deploy your app.
$ heroku container:release web -a "app-name-on-heroku"
```

To visualization logs 
```bash
$ heroku logs --tail -a "app-name-on-heroku"

<br>




## Stay in touch

- Author - [Fernando Castilho](https://github.com/CastilhoF)
- Linkedin - [Dev Castilho](https://www.linkedin.com/in/fernando-castilho/)
- Twitter - [@Castilho](https://twitter.com/CastilhoWylde)

