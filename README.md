## Description

[Backend] starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

#### Auth

- [POST /api/auth/register](#post-apiauthregister)
- [POST /api/auth/login](#post-apiauthlogin)
- [POST /api/auth/logout](#post-apiauthlogout)

#### User

- [GET /api/user/me](#get-apiuserme)

#### Post

- [POST /api/post/new](#post-apipostnew)
- [POST /api/post/comment](#post-apipostcomment)
- [POST /api/post/like](#post-apipostlike)
- [POST /api/post/unlike](#post-apipostunlike)

## Auth

### POST /api/auth/register

- **name**: Name
- **email**: Email
- **password**: Password

### POST /api/auth/login

- **email**: Email
- **password**: Password

### POST /api/auth/logout

## User

### GET /api/user/me

## Post

### POST /api/post/new

- **title**: Title post
- **body**: Body post

### POST /api/post/comment

- **postId**: Id post
- **comment**: comment post

### POST /api/post/like

- **postId**: Id post

### POST /api/post/unlike

- **postId**: Id post
