import Service from './Service'
import { Plan } from '../Models/index.js'

export default class PlanService extends Service {
  static async all() {
    try {
      const all_plans = await Plan.findAll({ order: [['id', 'DESC']] })
      return this.return(true, 'All plans', all_plans)
    } catch (error) {
      return this.return(false, 'Error getting all plans', error)
    }
  }

  static async byId(id) {
    try {
      const planData = await Plan.findByPk(id)
      return this.return(true, 'Plan retrieved successfully', planData)
    } catch (error) {
      return this.return(false, 'Error getting plan by ID', error)
    }
  }

  static async add(data) {
    try {
      const newPlan = await Plan.create(data)

      return this.return(true, 'added plan data', newPlan)
    } catch (error) {
      return this.return(false, 'Error adding plan', error)
    }
  }

  static async delete(id) {
    try {
      await Plan.destroy({ where: { id } })
      return this.return(true, 'Plan deleted successfully')
    } catch (error) {
      return this.return(false, 'Error deleting plan', error)
    }
  }
}
