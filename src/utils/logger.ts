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
      url: req.baseUrl,
      params: JSON.stringify(req.params),
      headers: JSON.stringify(req.headers),
      body: JSON.stringify(req.body),
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      processTime: `${Date.now() - startTime}ms`,
    }));
  });
  next();
};
