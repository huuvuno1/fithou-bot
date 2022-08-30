import dotenvSafe from 'dotenv-safe';
import path from 'path';
import fs from 'fs';

const pathEnv = path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'dev'}`);

if (fs.existsSync(pathEnv)) {
  dotenvSafe.config({
    allowEmptyValues: true,
    path: pathEnv,
    sample: path.join(__dirname, '../../.env.example'),
  });
}
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongodb: {
    protocol: process.env.MONGODB_PROTOCOL,
    username: process.env.MONGODB_USERNAME,
    pasword: process.env.MONGODB_PASSWORD,
    host: process.env.MONGODB_HOST,
    replicaSet: process.env.MONGODB_REPLICA_SET,
    dbName: process.env.MONGODB_NAME,
  },
  service: {
    fithou: process.env.FITHOU_URL,
    ctms: process.env.CTMS_URL,
  },
  jobs: {
    fithou: {
      hour: process.env.FITHOU_JOB_HOUR,
      minute: process.env.FITHOU_JOB_MINUTE || 30,
      second: process.env.FITHOU_JOB_SECOND,
    },
  },
};
