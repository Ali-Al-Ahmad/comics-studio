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
})
