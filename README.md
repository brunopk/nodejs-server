# Node JS Server

A Home Assistant custom add-on that runs an HTTP server using Node.js and Express. It exposes an endpoint at *http://localhost:3000*. Also includes [Bree](https://www.npmjs.com/package/bree) to handle scheduled jobs.

> - The hostname (Docker container hostname) for the add-on will be *local-nodejs-server*, derived from the slug name defined in *config.yaml*, as explained in [Add-on communication](https://developers.home-assistant.io/docs/add-ons/communication).
> - To test it's working, the API is provided with the endpoint GET /, it should return "Hello World"

## Development

### Development with HMR (hot module reloading)

```bash
yarn dev
```

## Links

- [Tutorial: Making your first add-on](https://developers.home-assistant.io/docs/add-ons/tutorial).
- [How to Set Up ESLint and Prettier in a TypeScript Project](https://dev.to/forhad96/-how-to-set-up-eslint-and-prettier-in-a-typescript-project-3pi2).
- [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started).
- [Installing Express](https://expressjs.com/en/starter/installing.html).
- [Bree](https://www.npmjs.com/package/bree).
