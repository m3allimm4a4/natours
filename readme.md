# Natours Web API

## Description

This is a REST API developed using ExpressJS and MongoDB Atlas using the MVC archetecture. API security features implemented. Feel free to use this repo as a template for your project.

## Prerequisites

- NodeJS LTS 14.19.0+ (It's prefered to use nvm).
- pnpm installed globally. `npm i -g pnpm` (cuz it's way better than npm)
- nodemon installed globally. `npm i -g nodemon` (for live reload)

## Project setup

- `pnpm install`.
- Create `config.env` inside `src/environment`. Refer to `src/environment/config-template.env`.
- DB connection string should have `<PASSWORD>` instead of your actual password. Fill in the password in the `DB_PASSWORD` variable.

## Import Dev Data

- Go to `src/models/userModel.js` and comment out the pre save middleware to disable password hashing (since dev-data users are already hashed).
- Clear all DB data `pnpm delete-dev-data`.
- Import new data `pnpm import-dev-data`.
- Password for all imported users is `test1234`.

## VS Code Extensions

- Prettier
- ESLint
- DotEnv
- IntelliCode
- Better Comments
- JavaScript (ES6) code snipets
- Nodejs Snippets
- npm
- Thunderclient (it's postman inside vscode)
- Atom One Dark
- Material Icons
