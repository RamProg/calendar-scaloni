import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model<IEvent & Document>('Event', EventSchema);
