// models/Offer.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  description: string;
  price: number;
  imageId?: string;
}

const offerSchema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: String, required: false },
});

export const Offer = mongoose.model<IOffer>('Offer', offerSchema);
