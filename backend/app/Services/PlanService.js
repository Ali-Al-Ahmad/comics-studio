import Service from './Service.js'
import { Plan } from '../Models/index.js'

export default class PlanService extends Service {
  static async all() {
    try {
      const all_plans = await Plan.findAll({ order: [['id', 'DESC']] })
      return this.return(true, 'All plans', all_plans)
    } catch (error) {
      this.handleError(error, 'Error getting all plans')
    }
  }
  static async byId(id) {
    try {
      const planData = await Plan.findByPk(id)
      return this.return(true, 'Plan retrieved successfully', planData)
    } catch (error) {
      this.handleError(error, 'Error getting plan by ID')
    }
  }
  static async add(data) {
    try {
      const newPlan = await Plan.create(data)

      return this.return(true, 'added plan data', newPlan)
    } catch (error) {
      this.handleError(error, 'Error adding plan')
    }
  }
  static async delete(id) {
    try {
      await Plan.destroy({ where: { id } })
      return this.return(true, 'Plan deleted successfully')
    } catch (error) {
      this.handleError(error, 'Error deleting plan')
    }
  }
  static async update(id, allPlanData = {}) {
    try {
      await Plan.update(allPlanData, { where: { id } })
      const plan = await Plan.findByPk(id)

      return this.return(true, 'Updated plan data', plan)
    } catch (error) {
      this.handleError(error, 'Error updating plan')
    }
  }
}
