import Graceful from '@ladjs/graceful';
import Bree from 'bree';
import express from 'express';
import http from 'http';
import { HttpError } from 'http-errors';
import morgan from 'morgan';
import jobs from './jobs/config';
import { breeLogger, gracefulLogger, expressLogger as logger } from './logging';
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
  logger.warn('Listening on ' + bind);
}

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

const port = normalizePort(process.env.PORT || '3000');

const app = express();

app.set('port', port);

// Morgan Middleware using Winston to log requests

app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()) // Trim to remove newlines
    }
  })
);

// Router

app.use('*', router);

// Customization of HTTP server (http module provided by Node.js standard library)

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
