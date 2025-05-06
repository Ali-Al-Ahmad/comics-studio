'use strict'
import { faker } from '@faker-js/faker'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const characters = []

    try {
      const users = await queryInterface.sequelize.query(
        'SELECT id FROM users',
        { type: Sequelize.QueryTypes.SELECT }
      )

      for (let i = 0; i < 5; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]

        characters.push({
          name: faker.person.firstName(),
          description: faker.lorem.sentence(),
          image_url: faker.image.avatar(),
          user_id: randomUser.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('characters', characters)
    } catch (error) {
      console.error('Error seeding characters:', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('characters', null, {})
    } catch (error) {
      console.error('Error deleting characters:', error)
    }
  },
}
