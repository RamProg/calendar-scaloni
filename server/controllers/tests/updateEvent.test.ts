import supertest from "supertest";
import { createExpressApp } from "../../app";
import Event from "../../models/event.model";

import * as db from "./mocks/database";
import { mockEvent } from "./mocks/events";

const app = createExpressApp();
const request = supertest(app);

describe("PUT /event/:id", () => {
  let testEventId: string;
  beforeAll(async () => {
    await db.connect();
    const testEvent = await db.seedEvents([mockEvent]);
    testEventId = testEvent[0]._id || "";
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  it("should update an event from the database", async () => {
    const res = await request
      .put(`/event/${testEventId}`)
      .send({ ...mockEvent, title: "Updated Event" });

    const eventInDb = await Event.findOne({ _id: testEventId });

    expect(res.status).toBe(200);
    expect(eventInDb?.title).toBe("Updated Event");
  });

  it("should not update anything if an invalid ID is sent", async () => {
    const invalidId = "123456";
    const res = await request
      .put(`/event/${invalidId}`)
      .send({ title: "Updated Event" });

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Invalid ID");
  });

  it("should not update anything if no data fields are sent in the request body", async () => {
    const fakeId = "65c3c9be87912b75cc6d431e";
    const res = await request.put(`/event/${fakeId}`).send();

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Invalid or missing fields: title, description, startDate, endDate");
  });

  it("should not update anything if an ID which doesn't exist is sent", async () => {
    const fakeId = "65c3c9be87912b75cc6d431e";
    const res = await request
      .put(`/event/${fakeId}`)
      .send({ ...mockEvent, title: "Updated Event" });

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(`Event with ID ${fakeId} does not exist`);
  });
});