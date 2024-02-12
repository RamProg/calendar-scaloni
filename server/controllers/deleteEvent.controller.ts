import { Request, Response } from 'express';

import Event from '../models/event.model';
import { ObjectId } from 'mongodb';

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    const deletedEvent = await Event.findOneAndDelete({ _id: id });

    if (!deletedEvent) {
      return res
        .status(400)
        .send({ message: `Event with ID ${id} does not exist` });
    }

    return res.status(200).send({
      message: 'The event has been deleted successfully',
      deletedEvent,
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ message: 'Unexpected server error' });
  }
};
