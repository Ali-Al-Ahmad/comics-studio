import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { Admin } from '../../app/Models/index.js'

export const createAdmin = async (override = {}) => {
  const password = override.password || 'password'

  const adminData = {
    email: faker.internet.email(),
    password: await bcrypt.hash(password, 8),

    ...override,
  }

  const admin = await Admin.create(adminData)

  return { admin, plainPassword: password }
}
