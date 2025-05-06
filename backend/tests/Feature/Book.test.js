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

  // POST create book
  it('should create a book', async () => {
    const payload = {
      title: faker.lorem.words(3),
    }

    const sampleImagePath = path.resolve(
      __dirname,
      '../../public/uploads/sample.png'
    )

    const res = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${userToken}`)
      .field('title', payload.title)
      .attach('image_url', sampleImagePath)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.title).toBe(payload.title)

    try {
      await fs.unlink(path.resolve(res.body.data.image_url))
    } catch (err) {
      console.error('Error deleting test image:', err)
    }
  })

  // PUT update book
  it('should update a book', async () => {
    const book = await createBook()

    const res = await request(app)
      .put(`/api/v1/books/${book.book.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Updated Title' })
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.title).toBe('Updated Title')
  })

  // DELETE book
  it('should delete a book', async () => {
    const book = await createBook()

    const res = await request(app)
      .delete(`/api/v1/books/${book.book.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
  })

  // GET non-existent book
  it('should return error for non-existent book', async () => {
    const res = await request(app)
      .get('/api/v1/books/-1')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  // POST unauthenticated attempt
  it('should reject unauthenticated book creation', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'Unauth Book',
        description: 'Unauthorized book',
      })
      .expect(401)

    expect(res.body.success).toBe(false)
  })

  // Validation error
  it('should return validation error when missing required fields', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })
})
