import * as request from "supertest"
import * as mongoose from 'mongoose'
import * as faker from 'mongoose'
import * as seeder from 'mongoose-seed'

import app from "../src/app"
import constants from '../src/config/constants'

let token;
let token2;

beforeAll(async (done) => {
  let database = await mongoose.connect(constants.DB_URL)
  .then(res => {
    res.connection.db.dropDatabase()
  })

  await request(app).post("/api/v1/auth/signup")
  .send({
    "email": "test@example.com",
    "password": "abc123"
  })

  await request(app).post("/api/v1/auth/signup")
  .send({
    "email": "test2@example.com",
    "password": "abc123"
  })

  await request(app).post("/api/v1/auth/login")
  .send({
    "email": "test@example.com",
    "password": "abc123"
  })
  .then((res) => {
    token = res.body.token
  })

  await request(app).post("/api/v1/auth/login")
  .send({
    "email": "test@example.com",
    "password": "abc123"
  })
  .then((res) => {
    token2 = res.body.token
    done()
  })     

});

describe("GET /", () => {
  it("Should return 404", (done) => {
    request(app).get("/")
      .expect(404, done)
  })
})

describe("POST /auth/signup", () => {

  let okEmail = "test3@example.com"
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

describe("POST /auth/update", () => {

  let anotherEmail = "another.email@example.com"
  let anotherPassword = "abcd1234"

  let invalidEmail = "invalid_email"
  let invalidPasswordLength = "abc12"
  let invalidPasswordNumbers = "abc"

  it("Should return 401 without correct token", (done) => {
    request(app).post("/api/v1/auth/update")
      .expect(401, done)
  })

  it("Should return 400 without params", (done) => {
    request(app).post("/api/v1/auth/update")
      .set('Authorization', 'JWT ' + token2)
      .expect(400, done)
  })

  it("Should return error with invalid email", (done) => {
    request(app).post("/api/v1/auth/update")
      .set('Authorization', 'JWT ' + token2)
      .send({email: invalidEmail})
      .expect(400, done)
  })

  it("Should return error with too short password", (done) => {
    request(app).post("/api/v1/auth/update")
      .set('Authorization', 'JWT ' + token2)
      .send({password: invalidPasswordLength})
      .expect(400, done)
  })

  it("Should return error with password without numbers", (done) => {
    request(app).post("/api/v1/auth/update")
      .send({password: invalidPasswordNumbers})
      .set('Authorization', 'JWT ' + token2)
      .expect(400, done)
  })  

  it("Should update the email", (done) => {
    request(app).post("/api/v1/auth/update")
      .set('Authorization', 'JWT ' + token2)
      .send({
        "email": anotherEmail,
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body).toMatchObject({
          "email": anotherEmail
        })
        done()
    })
  })

  it("Should update the password", (done) => {
    request(app).post("/api/v1/auth/update")
      .set('Authorization', 'JWT ' + token2)
      .send({
        "password": anotherPassword,
      })
      .expect(200, done)
  })
})

describe("POST /api/v1/auth/forgot", () => {
  it("Should return 400 without email", (done) => {
    request(app).post("/api/v1/auth/forgot")
      .expect(400, done)
  })

  it("Should return 200 with correct email", (done) => {
    request(app).post("/api/v1/auth/forgot")
      .send({"email": "test2@example.com"})
      .expect(200, done)
  })
})

describe("POST /api/v1/auth/recover", () => {
  it("Should return 404 without token", (done) => {
    request(app).post("/api/v1/auth/recover/")
      .expect(404, done)
  })

  it("Should return 400 with wrong token", (done) => {
    request(app).post("/api/v1/auth/recover/xxx")
      .send({"email": "test2@example.com"})
      .expect(400, done)
  })
})