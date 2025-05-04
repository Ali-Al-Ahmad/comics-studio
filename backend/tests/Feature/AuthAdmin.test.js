import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createAdmin } from '../../database/factories/AdminFactory.js'
import { Admin } from '../../app/Models/index.js'

describe('Auth Routes', () => {
  let createdAdminData

  afterEach(async () => {
    if (createdAdminData) {
      await Admin.destroy({ where: { email: createdAdminData.admin.email } })
      createdAdminData = null
    }
  })

  it('should register a new admin', async () => {
    const email = faker.internet.email()
    const password = 'password'

    const res = await request(app).post('/api/v1/auth/admin/register').send({
      email,
      password,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveProperty('token')

    createdAdminData = { admin: { email } }
  })

  it('should log in an existing admin and return a token', async () => {
    createdAdminData = await createAdmin()

    const res = await request(app).post('/api/v1/auth/admin/login').send({
      email: createdAdminData.admin.email,
      password: createdAdminData.plainPassword,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveProperty('token')
  })
})

afterAll(async () => {
  if (global.sequelize) await global.sequelize.close()
  if (global.server) global.server.close()
})
