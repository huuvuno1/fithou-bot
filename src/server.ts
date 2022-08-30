import * as app from './app';
import logger from './logger';
import { loginCtms, logoutCtms } from 'service/ctms/auth';
import { getSubjects, getUserID } from 'service/ctms/subject';
import { convertHtmlToImage } from 'service/ctms/image';
const nodeHtmlToImage = require('node-html-to-image');

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  logger.error(e);
  process.exit(1);
});

app.listen();
