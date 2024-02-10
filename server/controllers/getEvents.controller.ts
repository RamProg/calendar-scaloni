import { Request, Response } from "express";

import Event from "../models/event.model";
import { isValidMonth, isValidYear } from "../utils/validator";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    
    if (!isValidMonth(month) || !isValidYear(year)) {
      return res.status(400).send({ message: "Month or year are missing or invalid" });
    }

    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

    const events = await Event.find({
      $or: [
        {
          startDate: {
            $gte: `${year}-${month}-01`,
            $lte: `${year}-${month}-${daysInMonth}`,
          },
        },
        {
          endDate: {
            $gte: `${year}-${month}-01`,
            $lte: `${year}-${month}-${daysInMonth}`,
          },
        },
        {
          startDate: { $lte: `${year}-${month}-01` },
          endDate: { $gte: `${year}-${month}-${daysInMonth}` },
        },
      ],
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
