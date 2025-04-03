import winston, { Logger } from 'winston';
import getConfig from './config'
import morgan from 'morgan';

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
      (info) =>
        `${info.label} [${info.timestamp}] [${info.level}] ${info.message} ${info.stack ? '\n' + info.stack : ''}`
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

function defaultLoggerFactory(level: string, label: Label) {
  return winston.createLogger({
    level,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), defaultAlignColorsAndTime(label))
      })
    ]
  });
}

function workerLoggerFactory(level: string, workerLoggingParameters: WorkerLoggingParameters) {
  return winston.createLogger({
    level,
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

export function loggerFactory(label: Label, workerLoggingParameters?: WorkerLoggingParameters) {
  const config = getConfig()

  if (typeof workerLoggingParameters !== 'undefined') {
    return workerLoggerFactory(config.logLevel, workerLoggingParameters);
  } else {
    return defaultLoggerFactory(config.logLevel, label);
  }
}

export function morganMiddleware(logger: Logger) {
  return morgan(logger.level == 'debug' ? 'combined' : 'short', {
    stream: {
      write: (message) => { 
        const statusMatch = message.match(/" (\d{3}) /);
        const status = statusMatch ? parseInt(statusMatch[1], 10) : 200;

        // Determine log level based on status code
        const logLevel: 'debug' | 'info' | 'warn' | 'error' =
          status >= 500 ? 'error' :
          status >= 400 ? 'warn'  :
          status >= 300 ? 'warn'  :
          status >= 200 ? 'info' :
          'info';

        logger.log(logLevel, message.trim());
      }
    }
  })
} 