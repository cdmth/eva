import * as request from "supertest";
import * as app from "../src/server";

test("should return 200 OK", () => {
  return request(app).get("/")
    .expect(404)
});
