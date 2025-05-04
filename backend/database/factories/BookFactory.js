import { faker } from '@faker-js/faker'
import { Book } from '../../app/Models/index.js'
import { createUser } from './UserFactory.js'
import { createCharacter } from './CharacterFactory.js'

export const createBook = async (override = {}) => {
  const user = override.user || (await createUser()).user
  const character =
    override.character || (await createCharacter({ user })).character

  const bookData = {
    title: faker.lorem.words(3),
    user_id: user.id,
    character_id: character.id,
    image_url: faker.image.url(),
    is_public: faker.datatype.boolean(),
    ...override,
  }

  const book = await Book.create(bookData)
  return { book, user, character }
}
