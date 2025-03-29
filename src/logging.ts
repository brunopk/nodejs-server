import winston from 'winston';

type Label = 'express' | 'bree' | 'graceful' | null;

type WorkerData = {
  job: {
    name: string;
  };
};

type WorkerLoggingParameters = {
  workerData: WorkerData;
  executionId: string;
};

function defaultAlignColorsAndTime(label: Label) {
  return winston.format.combine(
    winston.format.label({
      label: `[${label}]`
    }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ssZ'
    }),
    winston.format.printf(
      (info) => `${info.label} [${info.timestamp}] [${info.level}] ${info.message}\n${info.stack || ''}`
    )
  );
}

function workerAlignColorsAndTime(workerLoggingParameters: WorkerLoggingParameters) {
  return winston.format.combine(
    winston.format.label({
      label: `[${workerLoggingParameters.workerData.job.name}] [${workerLoggingParameters.executionId}]`
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

function workerLoggerFactory(workerLoggingParameters: WorkerLoggingParameters) {
  return winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          workerAlignColorsAndTime(workerLoggingParameters)
        )
      })
    ]
  });
}

function loggerFactory(label: Label, workerLoggingParameters?: WorkerLoggingParameters) {
  if (typeof workerLoggingParameters !== 'undefined') {
    return workerLoggerFactory(workerLoggingParameters);
  } else {
    return defaultLoggerFactory(label);
  }
}

export default loggerFactory;
