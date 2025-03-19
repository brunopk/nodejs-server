import { parentPort, workerData } from 'worker_threads';
import loggerFactory from '../logging';
import { v4 as uuidv4 } from 'uuid';


const logger = loggerFactory(null, { workerData, executionId: uuidv4().slice(0, 5)});

const snooze = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

logger.info('Starting job!');

const job = async () => {
  await snooze(2000);

  logger.info(`Data received ${JSON.stringify(workerData.arg1)}`);

  logger.info(JSON.stringify(workerData.arg1));

  // signal to parent that the job is done

  if (parentPort) parentPort.postMessage('done');

  process.exit(0);
};

job();
