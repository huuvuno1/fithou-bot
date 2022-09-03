import { Document } from 'mongoose';

export default interface User extends Document {
  username: string;
  password: string;
  subscribedIDs: string[];
  subjectHTML: string;
}
