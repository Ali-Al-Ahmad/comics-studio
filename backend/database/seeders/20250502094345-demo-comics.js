'use strict'
import { faker } from '@faker-js/faker'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const comics = []

    try {
      const books = await queryInterface.sequelize.query(
        'SELECT id FROM books',
        { type: Sequelize.QueryTypes.SELECT }
      )

      for (let i = 0; i < 5; i++) {
        const randomBook = books[Math.floor(Math.random() * books.length)]

        comics.push({
          caption: faker.lorem.sentences(2),
          image_url: faker.image.avatar(),
          book_id: randomBook.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('comics', comics)
    } catch (error) {
      console.error('Error seeding comics:', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('comics', null, {})
    } catch (error) {
      console.error('Error deleting comics:', error)
    }
  },
}
