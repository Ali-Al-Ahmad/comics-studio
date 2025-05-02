'use strict'
import { faker } from '@faker-js/faker'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const plans = []

    try {
      for (let i = 0; i < 5; i++) {
        plans.push({
          name: faker.commerce.productName(),
          price: faker.commerce.price(10, 100, 2),
          credits: faker.commerce.price(1, 100, 2),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('plans', plans)
    } catch (error) {
      console.error('Error seeding plans:', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('plans', null, {})
    } catch (error) {
      console.error('Error deleting plans:', error)
    }
  },
}
