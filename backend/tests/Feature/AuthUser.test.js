import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createUser } from '../../database/factories/UserFactory.js'
import { User } from '../../app/Models/index.js'

describe('Auth Routes', () => {
  let createdUserData

  afterEach(async () => {
    if (createdUserData) {
      await User.destroy({ where: { email: createdUserData.user.email } })
      createdUserData = null
    }
  })

  it('should register a new user', async () => {
    const email = faker.internet.email()
    const password = 'password'
    const first_name = faker.person.firstName()
    const last_name = faker.person.lastName()

    const res = await request(app).post('/api/v1/auth/user/register').send({
      email,
      password,
      first_name,
      last_name,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveProperty('token')

    createdUserData = { user: { email } }
  })

  it('should log in an existing user and return a token', async () => {
    createdUserData = await createUser()

    const res = await request(app).post('/api/v1/auth/user/login').send({
      email: createdUserData.user.email,
      password: createdUserData.plainPassword,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveProperty('token')
  })
})

afterAll(async () => {
  if (global.sequelize) await global.sequelize.close()
  if (global.server) global.server.close()
})
