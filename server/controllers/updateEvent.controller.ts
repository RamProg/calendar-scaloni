import { Request, Response } from 'express';

import Event from '../models/event.model';
import { ObjectId } from 'mongodb';
import { findErrors } from '../utils/validator';
import { createErrorMessage } from '../utils/errors';

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    const { title, description, startDate, endDate } = req.body;

    const errors = findErrors({ title, description, startDate, endDate });
    const isValid = errors.length === 0;

    if (!isValid) {
      const message = createErrorMessage(errors);
      return res.status(400).send({ message });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedStartDate > parsedEndDate) {
      return res
        .status(400)
        .send({ message: 'End date must be after the start date' });
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id },
      { title, description, startDate, endDate },
      { new: true }
    );

    if (!updatedEvent) {
      return res
        .status(400)
        .send({ message: `Event with ID ${id} does not exist` });
    }

    return res.status(200).send(updatedEvent);
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ message: 'Unexpected server error' });
  }
};
