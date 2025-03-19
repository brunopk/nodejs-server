import { parentPort, workerData } from 'worker_threads';
import loggerFactory from '../logging';

const logger = loggerFactory(null, workerData)

logger.info('Hello world !');

logger.info(`Data received ${JSON.stringify(workerData.arg1)}`);

logger.info(JSON.stringify(workerData.arg1));

// signal to parent that the job is done

if (parentPort)
  parentPort.postMessage('done');

process.exit(0);
