import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import noCache from 'nocache';
import routers from 'api';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import initializeResources from 'resources';
import { APP_CONSTANTS } from 'utils/constants';
import logger, { errorLogging, requestLogging } from './logger';
import config from 'config';
import { errorMiddleware } from 'middlewares';

const app = express();

app.use(cors());

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

initializeSecurity();
initializeMiddlewares();
app.use(APP_CONSTANTS.apiPrefix, routers);
initializeErrorHandler();

export const listen = async () => {
  // await initializeResources();
  app.listen(config.port || 3000, () => {
    logger.info(`App listening on the port ${config.port || 3000}`);
  });
};

export default app;
