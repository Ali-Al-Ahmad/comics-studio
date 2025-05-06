import { faker } from '@faker-js/faker'
import { Plan } from '../../app/Models/index.js'

export const createPlan = async (override = {}) => {
  const planData = {
    name: faker.commerce.productName(),
    price: faker.finance.amount(5, 100, 2),
    credits: faker.finance.amount(10, 500, 2),
    ...override,
  }

  const plan = await Plan.create(planData)
  return { plan }
}
