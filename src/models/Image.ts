// models/Image.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  path: string;
}

const imageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

export const Image = mongoose.model<IImage>('Image', imageSchema);
