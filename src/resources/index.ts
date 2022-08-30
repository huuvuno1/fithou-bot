import config from 'config';
import connectMongo from './mongo';
export default async () => {
  if (config.mongodb.host) {
    await connectMongo();
  }
};
