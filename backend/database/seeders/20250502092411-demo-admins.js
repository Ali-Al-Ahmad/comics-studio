'use strict'
import { faker } from '@faker-js/faker'
import HashPasswordTrait from '../../app/Traits/HashPasswordTrait.js'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const admins = []

    try {
      for (let i = 0; i < 5; i++) {
        const hashedPassword = await HashPasswordTrait.hashPassword('password')

        admins.push({
          email: faker.internet.email(),
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('admins', admins)
    } catch (error) {
      console.error('Error seeding admins:', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('admins', null, {})
    } catch (error) {
      console.error('Error deleting admins:', error)
    }
  },
}
