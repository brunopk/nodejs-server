# Node JS Server

A Home Assistant custom add-on that runs an HTTP server in Node.js. It can be used as a boilerplate.

The API is built [Express](https://expressjs.com/) and exposes two endpoints:

- `GET /hello`: returns "Hello World"
- `GET /db`: returns data from Maria DB (see [doc/db.md](doc/db.md))

## Features

- Provided with [Bree](https://www.npmjs.com/package/bree) to handle scheduled jobs.

## Important notes

- **The hostname (Docker container hostname) for the add-on will be *local-nodejs-server*, derived from the slug name defined in *config.yaml*, as explained in [Add-on communication](https://developers.home-assistant.io/docs/add-ons/communication).**

## Development

### Requirements

- MariaDB 10.11 (see [doc/db.md](doc/db.md)).
- Node.js (recommended to install with NVM).

### Development with HMR (hot module reloading)

1. Create local database for development (see [doc/db.md](doc/db.md)).
2. Run the server:

    ```bash
    yarn dev
    ```

## Links

- [Tutorial: Making your first add-on](https://developers.home-assistant.io/docs/add-ons/tutorial)
- [How to Set Up ESLint and Prettier in a TypeScript Project](https://dev.to/forhad96/-how-to-set-up-eslint-and-prettier-in-a-typescript-project-3pi2)
- [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Express](https://expressjs.com/)
- [Bree](https://www.npmjs.com/package/bree)
