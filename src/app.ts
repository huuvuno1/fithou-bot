/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Response, NextFunction } from 'express';
import routers from 'api';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from 'middlewares';
import noCache from 'nocache';
import initializeResources from 'resources';
import { APP_CONSTANTS } from 'utils/constants';
import logger, { errorLogging, requestLogging } from './logger';
import runjobs from 'jobs';

const app = express();

app.use(cors({ origin: '*' }));
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         'frame-ancestors': ["'self'", 'https://facebook.com', 'http://localhost:5500'],
//       },
//     },
//   })
// );

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

function initializeSecurity() {
  app.use(noCache());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
}

function initializeMiddlewares() {
  app.use(express.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(express.static('public'));

  // use for computing processing time on response
  app.use((request: any, _response: Response, next: NextFunction) => {
    request.startTime = Date.now();
    next();
  });

  app.use(requestLogging);
  app.use(errorLogging);
}

function initializeErrorHandler() {
  app.use(errorMiddleware);
}

// initializeSecurity();
initializeMiddlewares();
app.use(APP_CONSTANTS.apiPrefix, routers);
initializeErrorHandler();

export const listen = async () => {
  await initializeResources();
  await runjobs();
  app.listen(config.port, () => {
    logger.info(`=================================`);
    logger.info(`🚀 ⚡️[server]: Server is running at http://localhost:${config.port}`);
    logger.info(`=================================`);
  });
};

export default app;
