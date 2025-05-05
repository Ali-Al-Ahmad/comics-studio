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
})
