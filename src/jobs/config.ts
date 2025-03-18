import { JobOptions } from 'bree';
import path from 'path';

/**
 * Cron expressions are currently not working with TypeScript due to an issue with bree importing cron-validate using Common JS
 */

// const asd = later.parse.cron("* * * * *", false)

const jobs: Array<JobOptions> = [
  {
    name: 'test_1',
    interval: 'every 30 seconds',
    worker: {
      workerData: {
        arg1: 2
      }
    },
    path: path.join(__dirname, 'test.js')
  },
  {
    name: 'test_2',
    interval: 'every 10 seconds',
    worker: {
      workerData: {
        arg1: 2
      }
    },
    path: path.join(__dirname, 'test.js')
  }
];

export default jobs;

