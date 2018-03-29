import * as request from "supertest"
import * as mongoose from 'mongoose'

import app from "../src/app"
import constants from '../src/config/constants'

describe("GET /", () => {
  it("Should return 404", (done) => {
    request(app).get("/")
      .expect(404, done)
  })
})

describe("POST /auth/signup", () => {

  beforeAll(async () => {
    let database = mongoose.connect(constants.DB_URL)
    .then(res => {
      res.connection.db.dropDatabase()
    })
  });

  let okEmail = "test@example.com"
  let okPassword = "abc123"

  let invalidEmail = "invalid_email"
  let invalidPasswordLength = "abc12"
  let invalidPasswordNumbers = "abc"

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

  it("Should return error with invalid email", (done) => {
    request(app).post("/api/v1/auth/signup")
    .send({email: invalidEmail, password: okPassword})
    .expect(400, done)
  })

  it("Should return error with too short password", (done) => {
    request(app).post("/api/v1/auth/signup")
    .send({email: okEmail, password: invalidPasswordLength})
    .expect(400, done)
  })

  it("Should return error with password without numbers", (done) => {
    request(app).post("/api/v1/auth/signup")
    .send({email: okEmail, password: invalidPasswordNumbers})
    .expect(400, done)
  })  

  it("Should add the user", (done) => {
    request(app).post("/api/v1/auth/signup")
    .send({
      "email": okEmail,
      "password": okPassword
    })
    .expect(200)
    .end(function(err, res) {
      expect(res.body).toMatchObject({
        "email": okEmail
      })
      done()
    })
  })

  it("Should return error with duplicate email", (done) => {
    request(app).post("/api/v1/auth/signup")
    .send({
      "email": okEmail,
      "password": okPassword
    })
    .expect(400, done)
  })  

})

describe("POST /auth/login", () => {
  let okEmail = "test@example.com"
  let okPassword = "abc123"

  let wrongEmail = "test1@example.com"
  let wrongPassword = "abc124"

  it("Should return 401 with wrong email and password", (done) => {
    request(app).post("/api/v1/auth/login")
      .send({
        "email": wrongEmail,
        "password": wrongPassword
      })
      .expect(401, done)
  })

  it("Should return 401 with correct email but wrong password", (done) => {
    request(app).post("/api/v1/auth/login")
      .send({
        "email": okEmail,
        "password": wrongPassword
      })
      .expect(401, done)
  })

  it("Should return 200 with correct credentials", (done) => {
    request(app).post("/api/v1/auth/login")
      .send({
        "email": okEmail,
        "password": okPassword
      })
      .expect(200, done)
  })

  it("Should contain _id, email, and JWT", (done) => {
    request(app).post("/api/v1/auth/login")
      .send({
        "email": okEmail,
        "password": okPassword
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body.email).toMatch(okEmail)
        expect(res.body.token).toBeTruthy()
        expect(res.body._id).toBeTruthy()
        done()
      })
  })
})

describe("GET /hello", () => {

  let token = ""
  let okEmail = "test@example.com"
  let okPassword = "abc123"

  beforeAll(async (done) => {
    request(app).post("/api/v1/auth/login")
      .send({
        "email": okEmail,
        "password": okPassword
      })
      .then((res) => {
        token = res.body.token
        done()
      })      
  });

  it("Should return 401 unauthorized without token", (done) => {
    request(app).get("/api/v1/hello")
      .expect(401, done)
  })

  it("Should return 200 with correct token", (done) => {
    request(app).get("/api/v1/hello")
      .set('Authorization', 'JWT ' + token)
      .expect(200, done)
  })
})