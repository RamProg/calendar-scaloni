import { Request, Response } from "express";

import Event, { IEvent } from "../models/event.model";
import { findErrors } from "../utils/validator";
import { createErrorMessage } from "../utils/errors";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate }: IEvent = req.body;

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
        .send({ message: "End date must be after the start date" });
    }

    const newEvent = await Event.create({
      title,
      description,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    });

    return res
      .status(201)
      .send({ message: "Event successfully created", data: newEvent });
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ message: "Failed to create event" });
  }
};
