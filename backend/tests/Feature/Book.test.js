import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createUser } from '../../database/factories/UserFactory.js'
import sequelize from '../../config/Connection.js'
import path from 'path'
import fs from 'fs/promises'
import { createBook } from '../../database/factories/BookFactory.js'

describe('Book Controller Tests (User)', () => {
  let userToken
  let userId

  const createAndLoginUser = async () => {
    const data = await createUser()
    const res = await request(app).post('/api/v1/auth/user/login').send({
      email: data.user.email,
      password: data.plainPassword,
    })

    return {
      token: res.body.data.token,
      userId: data.user.id,
    }
  }

  const truncateAllTables = async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    for (const model of Object.values(sequelize.models)) {
      await model.destroy({ where: {}, truncate: true, force: true })
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true })
  }

  beforeEach(async () => {
    await truncateAllTables()
    const user = await createAndLoginUser()
    userToken = user.token
    userId = user.userId
  })

  afterAll(async () => {
    await sequelize.close()
    if (global.server) global.server.close()
  })

  // GET all books
  it('should fetch all books', async () => {
    await createBook()

    const res = await request(app)
      .get('/api/v1/books')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  // GET book by ID
  it('should fetch a specific book by ID', async () => {
    const book = await createBook()

    const res = await request(app)
      .get(`/api/v1/books/${book.book.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.title).toBe(book.book.title)
  })
})
