'use strict'
import { faker } from '@faker-js/faker'
import HashPasswordTrait from '../../app/Traits/HashPasswordTrait.js'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const users = []

    try {
      for (let i = 0; i < 5; i++) {
        const hashedPassword = await HashPasswordTrait.hashPassword('password')

        users.push({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('users', users)
    } catch (error) {
      console.error('Error seeding users:', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('users', null, {})
    } catch (error) {
      console.error('Error deleting users:', error)
    }
  },
}
