import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createUser } from '../../database/factories/UserFactory.js'
import { User } from '../../app/Models/index.js'
import sequelize from '../../config/Connection.js'

describe('User Controller Tests', () => {
  let userToken
  let userId

  const createAndLoginUser = async () => {
    const data = await createUser()
    const res = await request(app).post('/api/v1/auth/user/login').send({
      email: data.user.email,
      password: data.plainPassword,
    })

    if (!res.body.success) {
      throw new Error('User login failed during test setup.')
    }

    return {
      token: res.body.data.token,
      user: data.user,
    }
  }

  const truncateAllTables = async () => {
    await sequelize
      .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
      .catch(() => {})
    for (const model of Object.values(sequelize.models)) {
      await model.destroy({ where: {}, truncate: true, force: true })
    }
    await sequelize
      .query('SET FOREIGN_KEY_CHECKS = 1', { raw: true })
      .catch(() => {})
  }

  beforeEach(async () => {
    await truncateAllTables()
    const auth = await createAndLoginUser()
    userToken = auth.token
    userId = auth.user.id
  })

  afterAll(async () => {
    await sequelize.close()
    if (global.server) global.server.close()
  })
  
  it('should fetch all users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.success).toBe(true)
  })

  it('should fetch user by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.id).toBe(userId)
  })

  it('should update an user by ID', async () => {
    const updatedData = {
      email: faker.internet.email(),
      password: 'newpassword123',
    }

    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.email).toBe(updatedData.email)
  })

  it('should delete an user by ID', async () => {
    const newUser = await createUser()

    const loginRes = await request(app).post('/api/v1/auth/user/login').send({
      email: newUser.user.email,
      password: newUser.plainPassword,
    })

    const token = loginRes.body.data.token

    const res = await request(app)
      .delete(`/api/v1/users/${newUser.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toBe(true)

    const deleted = await User.findByPk(newUser.user.id)
    expect(deleted).toBeNull()
  })

  it('should return error for invalid user ID during fetch', async () => {
    const res = await request(app)
      .get('/api/v1/users/-1')
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /json/)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  it('should reject unauthorized access to user list', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body.success).toBe(false)
  })
})
