import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Articles from '../types/Articles';

const ArticlesSchema = new Schema<Articles>(
  {
    aid: { type: Number, required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    subscribedIDs: { type: [String], required: true, default: [] },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

ArticlesSchema.index({ aid: 1 });

const ArticlesModel: Model<Articles> = model<Articles>(MODELS.articles, ArticlesSchema, MODELS.articles);
export default ArticlesModel;
