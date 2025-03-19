import winston from 'winston';

type Label = 'express' | 'bree' | 'graceful' | null;

type WorkerData = {
  job: {
    name: string
  }
}

function defaultAlignColorsAndTime(label: Label) {
  return winston.format.combine(
    winston.format.label({
      label: `[${label}]`
    }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ssZ'
    }),
    winston.format.printf(
      (info) => `${info.label} [${info.timestamp}] [${info.level}] ${info.message}`
    )
  );
}

function workerAlignColorsAndTime(workerData: WorkerData) {
  return winston.format.combine(
    winston.format.label({
      label: `[${workerData.job.name}]`
    }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ssZ'
    }),
    winston.format.printf(
      (info) => `${info.label} [${info.timestamp}] [${info.level}] ${info.message}`
    )
  );
}

function defaultLoggerFactory(label: Label) {
  return winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), defaultAlignColorsAndTime(label))
      })
    ]
  });
}

function workerLoggerFactory(workerData: WorkerData) {
  return winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), workerAlignColorsAndTime(workerData))
      })
    ]
  });
}

function loggerFactory(label: Label, workerData?: WorkerData) {
  if (typeof workerData !== 'undefined') {
    return workerLoggerFactory(workerData);
  } else {
    return defaultLoggerFactory(label);
  }
}

export default loggerFactory;
