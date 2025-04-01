import Graceful from '@ladjs/graceful';
import Bree from 'bree';
import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import http from 'http';
import { HttpError } from 'http-errors';
import morgan from 'morgan';
import getConfig from './config';
import jobs from './jobs/config';
import loggerFactory from './logging';
import router from './router';

/**************************************************************************************************
 **************************************************************************************************/

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();

  if (addr == null) {
    logger.error(`server.address() returns null`);
    return;
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.info('Listening on ' + bind);
}

/**
 * Error middleware
 *
 * Important: set status before sending data (https://bit.ly/3Rww26S)
 * @param err
 * @param req
 * @param res
 * @param next
 */
const onHandlerError: ErrorRequestHandler = async (err, _, res, next) => {
  logger.error('', err)
  res.status(500).send(err)
  next();
}

/**************************************************************************************************
 *                                          LOGGING                                               *
 **************************************************************************************************/

const logger = loggerFactory('express');

const breeLogger = loggerFactory('bree');

const gracefulLogger = loggerFactory('graceful');

/**************************************************************************************************
 *                                      CONFIGURATIONS                                            *
 **************************************************************************************************/

const config = getConfig();

/**************************************************************************************************
 *                                           BREE                                                 *
 **************************************************************************************************/

const bree = new Bree({
  root: false,
  logger: breeLogger,
  jobs
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.

const graceful = new Graceful({ brees: [bree], logger: gracefulLogger });

graceful.listen();

// start all jobs (this is the equivalent of reloading a crontab):

(async () => {
  await bree.start();
})();

/**************************************************************************************************
 *                                          EXPRESS                                               *
 **************************************************************************************************/

const port = normalizePort(config.port);

const app = express();

app.set('port', port);

if (config.enableCORS) app.use(cors());

// Morgan Middleware using Winston to log requests

app.use(
  morgan('combined', {
    stream: {
      write: (message) => { 
        const statusMatch = message.match(/" (\d{3}) /);
        const status = statusMatch ? parseInt(statusMatch[1], 10) : 200;

        // Determine log level based on status code
        const logLevel: 'debug' | 'info' | 'warn' | 'error' =
          status >= 500 ? 'error' :
          status >= 400 ? 'warn'  :
          status >= 300 ? 'info'  :
          'info';

        logger.log(logLevel, message.trim());
      }
    }
  })
);

// Router

app.use('/', router);

// Error middleware

app.use('/', onHandlerError);

// Customization of HTTP server (http module provided by Node.js standard library)

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
