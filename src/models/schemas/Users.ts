import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import User from '../types/User';

const UsersSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    subscribedIDs: { type: [String], default: [] },
    subjectHTML: { type: String, default: '' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UsersSchema.index({ aid: 1 });

const UsersModel: Model<User> = model<User>(MODELS.users, UsersSchema, MODELS.users);
export default UsersModel;
