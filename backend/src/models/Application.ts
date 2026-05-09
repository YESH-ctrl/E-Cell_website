import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  fullName: string;
  email: string;
  rollNumber: string;
  department: string;
  year: string;
  reason: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  rollNumber: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);
