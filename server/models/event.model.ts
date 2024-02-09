import mongoose, { Schema, Document } from "mongoose";

export interface Event {
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

// Export the model and return your IUser interface
export default mongoose.model<Event & Document>("Event", EventSchema);
