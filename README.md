## Description

Api build in Node with Nestjs to reproduce a usage car control. This API was build to learn how to use Nestjs.

## Technologies
- NodeJS
- NestJs
- Postgres
- TypeORM
- Docker
- Swagger

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# Create and deploy database
$ docker-compose up -d

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```