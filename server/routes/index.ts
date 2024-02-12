import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from '../controllers';

export const eventRouter = Router();

eventRouter.post('/event', createEvent);
eventRouter.get('/events', getAllEvents);
eventRouter.put('/event/:id', updateEvent);
eventRouter.delete('/event/:id', deleteEvent);
