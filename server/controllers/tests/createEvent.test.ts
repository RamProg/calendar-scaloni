import supertest from "supertest";
import { pick } from "lodash";
import { createExpressApp } from "../../app";
import * as db from "./mocks/database";
import Event from "../../models/event.model";
import {
  describe,
  beforeAll,
  afterAll,
  afterEach,
  it,
  expect,
} from "@jest/globals";
import { mockEvent } from "./mocks/events";

const app = createExpressApp();
const request = supertest(app);

describe("POST /event/create", () => {
  beforeAll(async () => {
    await db.connect();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });
  it("should create a new event and return 201 status", async () => {
    const res = await request.post("/event").send(mockEvent);

    const eventsInDb = await Event.find({});

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Event successfully created");
    expect(pick(res.body.data, ["title", "description"])).toEqual({
      title: mockEvent.title,
      description: mockEvent.description,
    });
    expect(eventsInDb).toHaveLength(1);
  });

  it("should fail if all required fields aren't included in the request", async () => {
    const incompleteMockEvent = {
      title: "test event title",
      description: "test event description",
    };

    const res = await request.post("/event").send(incompleteMockEvent);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      "Invalid or missing fields: startDate, endDate"
    );
  });

  it("should fail if the start date is after the end date", async () => {
    const wrongDateMockEvent = {
      ...mockEvent,
      startDate: "2024-02-19T00:00:00.000Z",
      endDate: "2024-02-18T00:00:00.000Z",
    };

    const res = await request.post("/event").send(wrongDateMockEvent);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("End date must be after the start date");
  });

  it("should fail if a date is in the wrong format", async () => {
    const wrongFormatMockEvent = {
      ...mockEvent,
      startDate: "2024-02-16",
    };

    const res = await request.post("/event").send(wrongFormatMockEvent);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Invalid or missing fields: startDate");
  });
});
