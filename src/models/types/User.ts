import { Document } from 'mongoose';

export default interface User extends Document {
  username: string;
  password: string;
  subscribedID: string;
  subjectHTML: string;
  isSubscribedSubject: boolean;
  isTrackTimetable: boolean;
}
