import { Tspec } from 'tspec';
import { IEvent } from '../models/event.model';

interface IEventWithID extends IEvent {
  _id: string;
}

export type CalendarApiSpec = Tspec.DefineApiSpec<{
  definitions: {
    IEvent: IEvent;
    IEventWithID: IEventWithID;
  };
  paths: {
    '/events': {
      get: {
        summary: 'Get all events for a given month and year';
        query: { month: string; year: string };
        responses: {
          200: { events: IEventWithID[] };
          400: { message: string };
          500: { message: 'Unexpected server error' };
        };
      };
    };
    '/event': {
      post: {
        summary: 'Create a new event';
        body: IEvent;
        responses: {
          201: { message: 'Event successfully created'; data: IEventWithID };
          400: { message: string };
          500: { message: 'Failed to create event' };
        };
      };
    };
    '/event/{id}': {
      put: {
        summary: 'Update an event';
        path: { id: number };
        responses: {
          200: { updatedEvent: IEventWithID };
          400: { message: string };
          500: { message: 'Unexpected server error' };
        };
      };
      delete: {
        summary: 'Update an event';
        path: { id: number };
        responses: {
          200: { updatedEvent: IEventWithID };
          400: { message: string };
          500: { message: 'Unexpected server error' };
        };
      };
    };
  };
}>;
