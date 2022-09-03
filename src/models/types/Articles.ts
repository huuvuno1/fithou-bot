import { Document } from 'mongoose';

export default interface Articles extends Document {
  aid: number;
  link: string;
  title: string;
  subscribedIDs: string[];
}
