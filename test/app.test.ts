import * as request from "supertest"
import * as mongoose from 'mongoose'

import app from "../src/app"
import constants from '../src/config/constants'

beforeAll(async () => {
  let database = mongoose.connect(constants.DB_URL)
  .then(res => {
    res.connection.db.dropDatabase()
  })
});

describe("GET /", () => {
  it("Should return 404", (done) => {
    request(app).get("/")
      .expect(404, done)
  })
})

describe("POST /auth/signup", () => {
  it("Should return 400 without params", (done) => {
    request(app).post("/api/v1/auth/signup")
      .expect(400, done)
  })

  it("Should return error message without params", (done) => {
    let error = {
      "error": "email_required"
    }
    request(app).post("/api/v1/auth/signup")
    .end(function(err, res) {
      expect(res.body).toEqual(error)
      done()
    })
  })

  it("Should return error message with only email", (done) => {
    let error = {
      "error": "password_required"
    }
    request(app).post("/api/v1/auth/signup")
    .send({email: "test@test.com"})
    .end(function(err, res) {
      expect(res.body).toEqual(error)
      done()
    })
  })

  it("Should add the user", (done) => {
    let user = {
      "email": "test@example.com",
      "password": "abc123"
    }
    request(app).post("/api/v1/auth/signup")
    .send(user)
    .expect(200)
    .end(function(err, res) {
      expect(res.body).toMatchObject(user)
      done()
    })
  })  
})