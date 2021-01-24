# ExpGen
Generate french mixed expressions 

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Config NestJS :
```bash
$ npm install
$ npm i -g @nestjs/cli
```

## Running the app

Run project :
``` bash
$ cd ExpGen
$ npm run start
```

And acces to web interface : [localhost:3000/](localhost:3000)

## Acces API

|Route|Use case|
|--------|--------|
|GET `/`|Web interface|
|GET `/api/expressions/item`|Get all expressions|
|GET `/api/expressions/item/:id`|Get expression with id|
|GET `/api/expressions/random`|Get random expression|
|GET `/api/expressions/search/:value`|Get expressions according to value|
|GET `/api/expressions/load`|Load expressions with server file|
|POST `/api/expressions/item`|Add new expression|
|GET `/api/mixed_expressions/item`|Get all mixed expressions|
|GET `/api/mixed_expressions/item/:id`|Get mixed expression with id|
|GET `/api/mixed_expressions/random`|Get random mixed expression|
|GET `/api/expressions/search/:value`|Get mixed expressions according to value|
|GET `/api/mixed_expressions/load`|Load mixed expressions with server file|
|GET `/api/mixed_expressions/generate`|Generate mixed expressions with expressions|

## License

Nest is [MIT licensed](LICENSE).
