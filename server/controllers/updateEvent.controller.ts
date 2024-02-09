import { Request, Response } from "express";

import Event from "../models/event.model";
import { ObjectId } from "mongodb";
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const { title, description, startDate, endDate } = req.body;

    if (!title && !description && !startDate && !endDate) {
      return res.status(400).send({ message: "No fields to update" });
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
    return res.status(500).send({ message: "Unexpected server error", error });
  }
};
