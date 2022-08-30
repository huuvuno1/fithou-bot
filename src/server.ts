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

(async () => {
  const result = await loginCtms('nguyenhuuvuno1@gmail.com', 'huuvuno1');
  const userId = await getUserID(result.cookie);
  const response = await getSubjects(result.cookie, userId);
  const data = await convertHtmlToImage(response);
  console.log(response, data);
  logoutCtms(result.cookie);
})();
