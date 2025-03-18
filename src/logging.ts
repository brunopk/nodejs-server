import winston from 'winston';

type Label = 'express' | 'bree' | 'graceful'

const alignColorsAndTime = (label: Label) => winston.format.combine(
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

const loggerFactory = (label: Label) => winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), alignColorsAndTime(label))
    })
  ]
});

export const expressLogger = loggerFactory('express')

export const breeLogger = loggerFactory('bree')

export const gracefulLogger = loggerFactory('graceful')
