import supertest from "supertest";
import { createExpressApp } from "../../app";
import Event from "../../models/event.model";

import * as db from "./mocks/database";
import { mockEvent } from "./mocks/events";

const app = createExpressApp();
const request = supertest(app);

describe("DELETE /delete/:id", () => {
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
  it("should delete an event from the database", async () => {
    const res = await request.delete(`/event/${testEventId}`).send();

    const eventInDb = await Event.findOne({ _id: testEventId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("The event has been deleted successfully");
    expect(eventInDb).toBeFalsy();
  });

  it("should not delete anything if an invalid ID is sent", async () => {
    const invalidId = "12345";
    const res = await request.delete(`/event/${invalidId}`).send();

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Invalid ID");
  });

  it("should not delete anything if an ID which doesn't exist is sent", async () => {
    const fakeId = "65c3c9be87912b75cc6d431e";
    const res = await request.delete(`/event/${fakeId}`).send();

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(`Event with ID ${fakeId} does not exist`);
  });
});
