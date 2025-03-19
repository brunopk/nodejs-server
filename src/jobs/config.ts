// @ts-nocheck

import { JobOptions } from 'bree';
import later from 'later';
import path from 'path';

/**
 * Cron expressions are not currently working as strings and can only be created with 
 * later.parse.cron due to an issue with Bree and cron-validate in TypeScript, caused 
 * by importing cron-validate as a CommonJS module.
 */

const jobs: Array<JobOptions> = [
  {
    name: 'test_1',
    interval: later.parse.cron('* * * * *', false),
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
        arg1: 3
      }
    },
    path: path.join(__dirname, 'test.js')
  }
];

export default jobs;
