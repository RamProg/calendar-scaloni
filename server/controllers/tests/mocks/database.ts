import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Document } from 'mongoose';
import Event, { IEvent } from '../../../models/event.model';

const mongod = MongoMemoryServer.create();

export const connect = async () => {
  const uri = (await mongod).getUri();
  await mongoose.connect(uri);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const seedEvents = async (
  events: IEvent[]
): Promise<(IEvent & Document)[]> => {
  return await Event.create(events);
};
