'use strict'
import { faker } from '@faker-js/faker'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const books = []

    try {
      const users = await queryInterface.sequelize.query(
        'SELECT id FROM users',
        { type: Sequelize.QueryTypes.SELECT }
      )

      const characters = await queryInterface.sequelize.query(
        'SELECT id FROM characters',
        { type: Sequelize.QueryTypes.SELECT }
      )

      for (let i = 0; i < 5; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomCharacter =
          characters[Math.floor(Math.random() * characters.length)]

        books.push({
          title: faker.lorem.words(3),
          user_id: randomUser.id,
          character_id: randomCharacter.id,
          image_url: faker.image.avatar(),
          is_public: faker.datatype.boolean(),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('books', books)
    } catch (error) {
      console.error('Error seeding books:', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('books', null, {})
    } catch (error) {
      console.error('Error deleting books:', error)
    }
  },
}
