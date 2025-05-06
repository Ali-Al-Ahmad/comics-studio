import { faker } from '@faker-js/faker'
import { Comic } from '../../app/Models/index.js'
import { createBook } from './BookFactory.js'

export const createComic = async (override = {}) => {
  const book = override.book || (await createBook()).book

  const comicData = {
    caption: faker.lorem.sentence(),
    image_url: faker.image.url(),
    book_id: book.id,
    ...override,
  }

  const comic = await Comic.create(comicData)
  return { comic, book }
}
