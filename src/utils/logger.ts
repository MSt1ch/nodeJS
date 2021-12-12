import winston from 'winston';
import {NextFunction, Request, Response} from 'express';

const {format: {combine, colorize, timestamp, printf}, createLogger, transports} = winston;

const myFormat = printf(({level, message, timestamp}) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(
      colorize(),
      timestamp({format: 'isoDateTime'}),
      myFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  res.on('finish', () => {
    logger.info(JSON.stringify({
      method: req.method,
      url: req.url,
      params: JSON.stringify(req.params),
      body: JSON.stringify(req.body),
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      processTime: `${Date.now() - startTime}ms`,
    }));
  });
  next();
};
