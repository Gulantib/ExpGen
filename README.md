# ExpGen
Generate mixed expressions 


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
|GET `/:lang`|Web interface with language lang|
|GET `/api/:lang/expressions/item`|Get all expressions|
|GET `/api/:lang/expressions/item/:id`|Get expression with id|
|GET `/api/:lang/expressions/random`|Get random expression|
|GET `/api/:lang/expressions/search/:value`|Get expressions according to value|
|GET `/api/:lang/expressions/load`|Load expressions with server file|
|POST `/api/:lang/expressions/item`|Add new expression|
|GET `/api/:lang/mixed_expressions/item`|Get all mixed expressions|
|GET `/api/:lang/mixed_expressions/item/:id`|Get mixed expression with id|
|GET `/api/:lang/mixed_expressions/random`|Get random mixed expression|
|GET `/api/:lang/expressions/search/:value`|Get mixed expressions according to value|
|GET `/api/:lang/mixed_expressions/load`|Load mixed expressions with server file|
|GET `/api/:lang/mixed_expressions/generate`|Generate mixed expressions with expressions|

Note : lang is the language abbreviation attribute 

language supported :
|Language|Abbreviation|Supported|Note|
|--------|--------|--------|--------|
|French|fr|✅|Default language|
|British English|uk|✅||
|American English|us|❌||
|English|en|❌||
|German|de|❌||



## Online

Try it online on [exp-gen.herokuapp.com](https://exp-gen.herokuapp.com/).


## License

Nest is MIT licensed.