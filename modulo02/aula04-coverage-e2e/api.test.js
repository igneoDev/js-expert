const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite Test', () => {
  describe('/contact', () => {
    it('should return status 200 and correct text', async () => {
      const response = await request(app).get('/contact')
        .expect(200)
      assert.deepStrictEqual(response.text, 'contact us')
    })
  })

  describe('/default', () => {
    it('should request an inexistent route and return default value', async () => {
      const response = await request(app).get('/default')
        .expect(200)
      assert.deepStrictEqual(response.text, 'default')
    })
  })

  describe('/login', () => {
    it('should return no authorized wih invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'invalid_user', password: 'invalid_password' })
        .expect(401)
      assert.deepStrictEqual(response.text, 'login has failed')
      assert.ok(response.unauthorized)
    })
    it('should return status 200 and login successfully', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Ton', password: '123' })
        .expect(200)
      assert.deepStrictEqual(response.text, 'login has succeeded')
    })
  })
})
