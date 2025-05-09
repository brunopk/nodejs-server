# Node JS Server

A Home Assistant custom add-on that runs an HTTP server in Node.js to provide a REST API.

The API is built with [Express](https://expressjs.com/) and exposes two endpoints:

- `GET /hello`: returns "Hello World"
- `GET /db`: returns data from Maria DB (see [db.md](doc/db.md))

## Features

- ESLint and Prettier configurations for linting
- CORS headers enabled for development
- Error middleware following recommendations in [this](https://ioannisioannou.me/using-async-await-in-express-js/) article.
- [Winston](https://github.com/winstonjs) for logging
- [Bree](https://www.npmjs.com/package/bree) to handle scheduled jobs
- [MySQL2](https://sidorares.github.io/node-mysql2/docs) for database
- [dotenv](https://www.npmjs.com/package/dotenv) for configurations

> The ESLint configuration (eslint.config.mjs) is created with `yarn create @eslint/config -- --config eslint-config-standard
` as described in [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)

## Important notes

- **The hostname for the add-on will be *local-nodejs-server*, which is derived from the slug name defined in *config.yaml*, as explained in [Add-on communication](https://developers.home-assistant.io/docs/add-ons/communication). Also it will be displayed on add-on information page in Home Assistant.**

## Configurations

In order to run application correctly some environment variables must be defined:

- For production: `.env.production`
- For development: `.env.development`

Also they can be defined as usual with `export ENV_VAR=value` before running.

> To change [logging level](https://github.com/winstonjs/winston?tab=readme-ov-file#logging-levels), set `LOG_LEVEL`

## Development

### Requirements

- MariaDB 10.11 (see [db.md](doc/db.md)).
- Node.js (recommended to install with NVM).

### Development with HMR (hot module reloading)

1. Create local database for development (see [db.md](doc/db.md)).
2. Run the server:

    ```bash
    yarn dev
    ```

## Future improvements

- Loading configurations from add-on instead of environment variables

## Links

- [Tutorial: Making your first add-on](https://developers.home-assistant.io/docs/add-ons/tutorial)
- [How to Set Up ESLint and Prettier in a TypeScript Project](https://dev.to/forhad96/-how-to-set-up-eslint-and-prettier-in-a-typescript-project-3pi2)
- [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Express](https://expressjs.com/)
- [Using middlewares](https://expressjs.com/en/guide/using-middleware.html)
- [Bree](https://www.npmjs.com/package/bree)
- [MySQL2](https://sidorares.github.io/node-mysql2/docs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Winston](https://github.com/winstonjs)
