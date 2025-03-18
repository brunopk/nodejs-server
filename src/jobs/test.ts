import {breeLogger as logger} from '../logging'
import { parentPort, workerData } from 'worker_threads';


function cancel() {
  // do cleanup here
  // (if you're using @ladjs/graceful, the max time this can run by default is 5s)

  // send a message to the parent that we're ready to terminate
  // (you could do `process.exit(0)` or `process.exit(1)` instead if desired
  // but this is a bit of a cleaner approach for worker termination
  if (parentPort) parentPort.postMessage('cancelled');
  else process.exit(0);
}

if (parentPort)
  parentPort.once('message', message => {
    if (message === 'cancel') return cancel();
  });

logger.info('Hello world !')

logger.info(`Data received ${JSON.stringify(workerData.arg1)}`)