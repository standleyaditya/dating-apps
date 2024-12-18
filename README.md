<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

The Structure I'm using is 5 table that includes :
```sql
User {
  user_id : UUID;
  username : string;
  email : string;
  password : string;
}

Profiles {
  profile_id : int;
  user_id : UUID;
  fullname : string;
  bio : string;
  age: int;
  swipe_count int;
  last_swiped_at timestamp;
}

Package {
  id : int;
  name : string;
  price: int;
  desc : string;
  created_at : timestamp;
  updated_at : timestamp;
  deleted_at : timestamp;
}

Premium {
  premium_id : int;
  user_id : uuid;
  package_id : int;
  subscription_date : timestamp;
}

swipe {
  swipe_id : int;
  profile_id : int;
  swiped_id : int;
  action : string;
  swiped_at : timestamp;
}
```
#

## Project setup

```bash
$ npm install
$ docker-compose up
$ npm migration:generate
$ npm migration:run
```

## Compile and run the project

```bash
# development
$ npm run start 

# watch mode
$ npm run start:dev (will auto start db migration)
```

### API Endpoints

#### AUTH
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /auth/login | Login to existing user account |
| POST | /auth/signup | Create new Account |
| POST | /auth/signout | Sign out from session |

#### USERS
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /users/ | Get all users data |
| GET | /users/:id | Get user by id |
| POST | /users/ | Create User |
| PUT | /usesr/:id | Edit your user attribute |
| PATCH | /users/:id | Restore user that have been soft deleted |
| DELETE | /users/:id | Soft delete user |

#### PROFILES
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /profiles/ | Get all profile data |
| GET | /profiles/:id | Get profile by id |
| POST | /profiles/ | Create profile |
| PUT | /profiles/:id | Edit your profile attribute |
| PATCH | /profiles/:id | Restore profile that have been soft deleted |
| DELETE | /profiles/:id | Soft delete profile |

#### PACKAGES
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /packages/ | Get all package data |
| GET | /packages/:id | Get package by id |
| POST | /packages/ | Create package |
| PUT | /packages/:id | Edit your package attribute |
| PATCH | /packages/:id | Restore package that have been soft deleted |
| DELETE | /packages/:id | Soft delete package |

#### PREMIUMS (for storing user package data)
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /premiums/ | Get all premiums data |
| GET | /premiums/:id | Get premium by id |
| POST | /premiums/ | Create premium |
| PUT | /premiums/:id | Edit your premium attribute |
| PATCH | /premiums/:id | Restore premium that have been soft deleted |
| DELETE | /premiums/:id | Soft delete premium |

#### SWIPES (for storing user swipes data)
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /swipes/ | Get all swipes data |
| GET | /swipes/:id | Get swipe by id |
| POST | /swipes/ | Create swipe |
| PUT | /swipes/:id | Edit your swipe attribute |
| PATCH | /swipes/:id | Restore swipe that have been soft deleted |
| DELETE | /swipes/:id | Soft delete swipe |

### API DOCUMENTATION

#### AUTH

- Login
```http
POST /auth/login
{
  "email" : "youremail@email.com",
  "password" : "yourpassword"
}
```
- Sign Up
```http
POST /auth/signup
{
  "username" : "yourusername",
  "email" : "youremail@email.com",
  "password" : "yourpassword"
}
```
- Sign Out
```http
POST /auth/signout
{}
```

#### USERS

- Get
```http
GET /users/
{}

GET  /users/:id
{}
```

- Create
```http
POST /users/
{
  "username" : "yourusername",
  "email" : "youremail@email.com",
  "password" : "yourpassword"
}
```
- Update
```http
PUT /users/:id
{
  "username" : "yourusername",
  "email" : "youremail@email.com",
  "password" : "yourpassword"
}
```
- Soft Delete
```http
DELETE /users/:id
{}
```
- Restore User
```http
PATCH /users/:id
{}
```
#### PROFILES

- Get
```http
GET /profiles/
{}

GET  /profiles/:id
{}
```

- Create
```http
POST /profiles/
{
  "user_id" : "UUID",
  "fullname" : "yourfullname",
  "bio" : "yourbio",
  "age" : 21
}
```
- Update
```http
PUT /profiles/:id
{
  "user_id" : "UUID",
  "fullname" : "yourfullname",
  "bio" : "yourbio",
  "age" : 21
}
```
- Soft Delete
```http
DELETE /profiles/:id
{}
```
- Restore profiles
```http
PATCH /profiles/:id
{}
```
#### PACKAGES

- Get
```http
GET /packages/
{}

GET  /packages/:id
{}
```

- Create
```http
POST /packages/
{
  "name" : "packagename",
  "price" : 10000,
  "desc" : "itemdesc"
}
```
- Update
```http
PUT /packages/:id
{
  "name" : "packagename",
  "price" : 10000,
  "desc" : "itemdesc"
}
```
- Soft Delete
```http
DELETE /packages/:id
{}
```
- Restore package
```http
PATCH /packages/:id
{}
```

#### PREMIUMS

- Get
```http
GET /premiums/
{}

GET  /premiums/:id
{}
```

- Create
```http
POST /premiums/
{
  "user_id" : "uuid",
  "package_id" : 2
}
```
- Update
```http
PUT /premiums/:id
{
  "status" : "active || inactive"
}
```
- Soft Delete
```http
DELETE /premiums/:id
{}
```
- Restore premium
```http
PATCH /premiums/:id
{}
```

#### SWIPES

- Get
```http
GET /swipes/
{}

GET  /swipes/:id
{}
```

- Create
```http
POST /swipes/
{
  "profile_id" : 14
}
```
- Update
```http
PATCH /swipes/:id
{
  "status" : "pass || like"
}
```
- Soft Delete
```http
DELETE /swipes/:id
{}
```
