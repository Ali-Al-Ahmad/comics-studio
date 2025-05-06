import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { User } from '../../app/Models/index.js'

export const createUser = async (override = {}) => {
  const plainPassword = override.password || 'password'
  const hashedPassword = await bcrypt.hash(plainPassword, 8)

  const userData = {
    email: faker.internet.email(),
    password: hashedPassword,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    phone: faker.phone.number('70#######'),
    profile_picture: faker.image.avatar(),
    plan_id: null,
    ...override,
  }

  const user = await User.create(userData)
  return { user, plainPassword }
}
