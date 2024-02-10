import supertest from "supertest";
import { createExpressApp } from "../../app";
import * as db from "./mocks/database";
import { mockEvents } from "./mocks/events";

const app = createExpressApp();
const request = supertest(app);

describe("GET /events", () => {
  beforeAll(async () => {
    await db.connect();
    await db.seedEvents(mockEvents);
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });
  it("should return all events in the database for a given month and year", async () => {
    const res = await request
      .get("/events")
      .query({ month: "01", year: "2024" })
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it("should return an empty array if no events in the database for a given month and year", async () => {
    const res = await request
      .get("/events")
      .query({ month: "11", year: "2022" })
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it("should return an error if the year is not valid", async () => {
    const res = await request
      .get("/events")
      .query({ month: "11", year: "-2022" })
      .send();

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Month or year are missing or invalid");
  });

  it("should return an error if the month is not valid", async () => {
    const res = await request
      .get("/events")
      .query({ month: "13", year: "2022" })
      .send();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Month or year are missing or invalid");
  });
});
