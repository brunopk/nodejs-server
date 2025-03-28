# Node JS Server

A Home Assistant custom add-on that runs an HTTP server using Node.js and Express. It serves as a boilerplate code. For testing purposes, the API is provided with the endpoint `GET /` which should return "Hello World"

## Features

- Provided with [Bree](https://www.npmjs.com/package/bree) to handle scheduled jobs.

## Important notes

- **The hostname (Docker container hostname) for the add-on will be *local-nodejs-server*, derived from the slug name defined in *config.yaml*, as explained in [Add-on communication](https://developers.home-assistant.io/docs/add-ons/communication).**

## Development

### Requirements

- MySQL (can be installed with `brew` in macOS).
- Node.js (recommended to install with NVM).

### Development with HMR (hot module reloading)

```bash
yarn dev
```

## Links

- [Tutorial: Making your first add-on](https://developers.home-assistant.io/docs/add-ons/tutorial)
- [How to Set Up ESLint and Prettier in a TypeScript Project](https://dev.to/forhad96/-how-to-set-up-eslint-and-prettier-in-a-typescript-project-3pi2)
- [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Express](https://expressjs.com/)
- [Bree](https://www.npmjs.com/package/bree)
