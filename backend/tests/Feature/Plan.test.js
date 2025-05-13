import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import sequelize, { initDatabase } from '../../config/Connection.js'
import { createUser } from '../../database/factories/UserFactory.js'
import { createPlan } from '../../database/factories/PlanFactory.js'

describe('Plan Controller Tests', () => {
  let userToken

  const createAndLoginUser = async () => {
    const data = await createUser()
    const res = await request(app).post('/api/v1/auth/user/login').send({
      email: data.user.email,
      password: data.plainPassword,
    })

    return res.body.data.token
  }

  const truncateAllTables = async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    for (const model of Object.values(sequelize.models)) {
      await model.destroy({ where: {}, truncate: true, force: true })
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true })
  }

  beforeEach(async () => {
    await initDatabase()
    await truncateAllTables()
    userToken = await createAndLoginUser()
  })

  afterAll(async () => {
    await sequelize.close()
    if (global.server) global.server.close()
  })

  it('should fetch all plans', async () => {
    await createPlan()

    const res = await request(app)
      .get('/api/v1/plans')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should fetch a specific plan by ID', async () => {
    const { plan } = await createPlan()

    const res = await request(app)
      .get(`/api/v1/plans/${plan.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe(plan.name)
  })

  it('should create a plan', async () => {
    const payload = {
      name: faker.commerce.productName(),
      price: '29.99',
      credits: '100.00',
    }

    const res = await request(app)
      .post('/api/v1/plans')
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe(payload.name)
  })

  it('should update a plan', async () => {
    const { plan } = await createPlan()

    const res = await request(app)
      .put(`/api/v1/plans/${plan.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Updated Plan Name' })
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Updated Plan Name')
  })

  it('should delete a plan', async () => {
    const { plan } = await createPlan()

    const res = await request(app)
      .delete(`/api/v1/plans/${plan.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
  })

  it('should return error for non-existent plan', async () => {
    const res = await request(app)
      .get('/api/v1/plans/-1')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  it('should reject unauthenticated plan creation', async () => {
    const res = await request(app)
      .post('/api/v1/plans')
      .send({
        name: 'Unauthorized Plan',
        price: '19.99',
        credits: '50.00',
      })
      .expect(401)

    expect(res.body.success).toBe(false)
  })

  it('should return validation error when missing required fields', async () => {
    const res = await request(app)
      .post('/api/v1/plans')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })
})
