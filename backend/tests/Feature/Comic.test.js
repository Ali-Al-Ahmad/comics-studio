import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createUser } from '../../database/factories/UserFactory.js'
import { createBook } from '../../database/factories/BookFactory.js'
import { createComic } from '../../database/factories/ComicFactory.js'
import sequelize from '../../config/Connection.js'

describe('Comic Controller Tests (User)', () => {
  let userToken
  let userId
  let bookId

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

    const book = await createBook()

    bookId = book.book.id
  })

  afterAll(async () => {
    await sequelize.close()
    if (global.server) global.server.close()
  })

  // GET all comics
  it('should fetch all comics', async () => {
    await createComic()

    const res = await request(app)
      .get('/api/v1/comics')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  // GET comic by ID
  it('should fetch a specific comic by ID', async () => {
    const comic = await createComic()

    const res = await request(app)
      .get(`/api/v1/comics/${comic.comic.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.caption).toBe(comic.comic.caption)
  })

  // POST create comic
  it('should create a comic', async () => {
    const payload = {
      caption: faker.lorem.sentence(),
      image_url: faker.image.url(),
      book_id: bookId,
    }

    const res = await request(app)
      .post('/api/v1/comics')
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.caption).toBe(payload.caption)
  })

  // PUT update comic
  it('should update a comic', async () => {
    const comic = await createComic()

    const res = await request(app)
      .put(`/api/v1/comics/${comic.comic.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ caption: 'New Caption' })
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.caption).toBe('New Caption')
  })

  // DELETE comic
  it('should delete a comic', async () => {
    const comic = await createComic()

    const res = await request(app)
      .delete(`/api/v1/comics/${comic.comic.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
  })

  // GET invalid comic ID
  it('should return error for non-existent comic', async () => {
    const res = await request(app)
      .get('/api/v1/comics/-1')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  // POST unauthenticated attempt
  it('should reject unauthenticated comic creation', async () => {
    const res = await request(app)
      .post('/api/v1/comics')
      .send({
        caption: 'Unauthorized Comic',
        image_url: faker.image.url(),
        book_id: bookId,
      })
      .expect(401)

    expect(res.body.success).toBe(false)
  })
})
