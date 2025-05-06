import { faker } from '@faker-js/faker'
import { Character } from '../../app/Models/index.js'
import { createUser } from './UserFactory.js'

export const createCharacter = async (override = {}) => {
  const user = override.user || (await createUser()).user

  const characterData = {
    user_id: user.id,
    name: faker.word.adjective() + '_' + faker.word.noun(),
    description: faker.lorem.sentence(),
    image_url: faker.image.avatar(),
    is_favorite: faker.datatype.boolean(),
    ...override,
  }

  const character = await Character.create(characterData)
  return { character, user }
}
