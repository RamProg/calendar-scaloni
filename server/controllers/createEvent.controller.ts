import { Request, Response } from "express";

import Event, { IEvent } from "../models/event.model";

export type CreateEventPayload = {
  title: IEvent["title"];
  description: IEvent["description"];
  startDate: IEvent["startDate"];
  endDate: IEvent["endDate"];
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate }: CreateEventPayload =
      req.body;

    if (!title || !description || !startDate || !endDate) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    if (new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .send({ message: "End date must be after the start date" });
    }

    const newEvent = await Event.create({
      title,
      description,
      startDate,
      endDate,
    });

    return res
      .status(201)
      .send({ message: "Event successfully created", data: newEvent });
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ message: "Failed to create event" });
  }
};
