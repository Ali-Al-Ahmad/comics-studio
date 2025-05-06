import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createAdmin } from '../../database/factories/AdminFactory.js'
import { Admin } from '../../app/Models/index.js'
import sequelize from '../../config/Connection.js'

describe('Admin Controller Tests', () => {
  let adminToken
  let adminId

  const createAndLoginAdmin = async () => {
    const data = await createAdmin()
    const res = await request(app).post('/api/v1/auth/admin/login').send({
      email: data.admin.email,
      password: data.plainPassword,
    })

    if (!res.body.success) {
      throw new Error('Admin login failed during test setup.')
    }

    return {
      token: res.body.data.token,
      admin: data.admin,
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
    const auth = await createAndLoginAdmin()
    adminToken = auth.token
    adminId = auth.admin.id
  })

  afterAll(async () => {
    await sequelize.close()
    if (global.server) global.server.close()
  })
  
  it('should fetch all admins', async () => {
    const res = await request(app)
      .get('/api/v1/admins')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.success).toBe(true)
  })

  it('should fetch admin by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/admins/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.id).toBe(adminId)
  })

  it('should update an admin by ID', async () => {
    const updatedData = {
      email: faker.internet.email(),
      password: 'newpassword123',
    }

    const res = await request(app)
      .put(`/api/v1/admins/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.email).toBe(updatedData.email)
  })

  it('should delete an admin by ID', async () => {
    const newAdmin = await createAdmin()

    const loginRes = await request(app).post('/api/v1/auth/admin/login').send({
      email: newAdmin.admin.email,
      password: newAdmin.plainPassword,
    })

    const token = loginRes.body.data.token

    const res = await request(app)
      .delete(`/api/v1/admins/${newAdmin.admin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.success).toBe(true)

    const deleted = await Admin.findByPk(newAdmin.admin.id)
    expect(deleted).toBeNull()
  })

  it('should return error for invalid admin ID during fetch', async () => {
    const res = await request(app)
      .get('/api/v1/admins/-1')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect('Content-Type', /json/)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  it('should reject unauthorized access to admin list', async () => {
    const res = await request(app)
      .get('/api/v1/admins')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body.success).toBe(false)
  })

  it('should return 422 for non-existent admin ID', async () => {
    const res = await request(app)
      .get('/api/v1/admins/-1')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  it('should return 422 when trying to update a non-existent admin', async () => {
    const res = await request(app)
      .put('/api/v1/admins/-1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email: faker.internet.email() })
      .expect(422)

    expect(res.body.success).toBe(false)
  })
})
