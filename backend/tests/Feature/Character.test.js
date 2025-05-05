import request from 'supertest'
import app from '../../server.js'
import { faker } from '@faker-js/faker'
import { createUser } from '../../database/factories/UserFactory.js'
import { Character } from '../../app/Models/index.js'
import sequelize from '../../config/Connection.js'
import path from 'path'
import fs from 'fs/promises'

describe('Character Controller Tests (User)', () => {
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

  //Character get all test
  it('should fetch all characters', async () => {
    await Character.create({
      user_id: userId,
      name: faker.person.firstName(),
      description: faker.lorem.sentence(),
      image_url: faker.image.avatar(),
    })

    const res = await request(app)
      .get('/api/v1/characters')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  //Character getById test
  it('should fetch a specific character by ID', async () => {
    const character = await Character.create({
      user_id: userId,
      name: 'Batman',
      description: 'Dark Knight',
      image_url: faker.image.avatar(),
    })

    const res = await request(app)
      .get(`/api/v1/characters/${character.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Batman')
  })

  //Character Add test
  it('should create a character', async () => {
    const payload = {
      name: faker.person.firstName(),
      description: faker.lorem.sentence(),
    }
    const sampleImagePath = path.resolve(
      __dirname,
      '../../public/uploads/sample.png'
    )
    const res = await request(app)
      .post('/api/v1/characters')
      .set('Authorization', `Bearer ${userToken}`)
      .field('name', payload.name)
      .field('description', payload.description)
      .attach('image_url', sampleImagePath)
      .expect(200)

    expect(res.body.success).toBe(true)

    try {
      await fs.unlink(path.resolve(res.body.data.image_url))
    } catch (err) {
      console.error('Error deleting test image:', err)
    }
  })

  //Character update test
  it('should update a character', async () => {
    const character = await Character.create({
      user_id: userId,
      name: 'Superman',
      description: 'Man of Steel',
      image_url: faker.image.avatar(),
    })

    const res = await request(app)
      .put(`/api/v1/characters/${character.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Updated Superman' })
      .expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Updated Superman')
  })

  //Character delete test
  it('should delete a character', async () => {
    const character = await Character.create({
      user_id: userId,
      name: 'DeleteMe',
      description: 'Temporary character',
      image_url: faker.image.avatar(),
    })

    const res = await request(app)
      .delete(`/api/v1/characters/${character.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200)

    expect(res.body.success).toBe(true)
    const deleted = await Character.findByPk(character.id)
    expect(deleted).toBeNull()
  })

  //Character non-existent test
  it('should return error for non-existent character', async () => {
    const res = await request(app)
      .get('/api/v1/characters/-1')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })

  //Character unauthenticated create test
  it('should reject unauthenticated create attempt', async () => {
    const res = await request(app)
      .post('/api/v1/characters')
      .field('name', 'Test')
      .field('description', 'Unauthorized')
      .expect(401)

    expect(res.body.success).toBe(false)
  })

  //Character missing attributes validation test
  it('should return validation error when missing attributes', async () => {
    const res = await request(app)
      .post('/api/v1/characters')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(422)

    expect(res.body.success).toBe(false)
  })
})
