import Controller from './Controller.js'
import PlanService from '../../Services/PlanService.js'

class PlanController extends Controller {
  static async getAllPlans(req, res) {
    try {
      const result = await PlanService.all()
      return PlanController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return PlanController.returnResponse(
        res,
        false,
        'Error in All Plans Controller',
        error
      )
    }
  }

  static async getPlanById(req, res) {
    try {
      const result = await PlanService.byId(req.params.id)
      return PlanController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return PlanController.returnResponse(
        res,
        false,
        'Error in Plan By Id Controller',
        error
      )
    }
  }

  static async addPlan(req, res) {
    try {
      const result = await PlanService.add(req.body)
      return PlanController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return PlanController.returnResponse(
        res,
        false,
        'Error in Add Plan Controller',
        error
      )
    }
  }

  static async deletePlan(req, res) {
    try {
      const result = await PlanService.delete(req.params.id)
      return PlanController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return PlanController.returnResponse(
        res,
        false,
        'Error in Delete Plan Controller',
        error
      )
    }
  }

  static async updatePlan(req, res) {
    try {
      const result = await PlanService.update(req.params.id, req.body)
      return PlanController.returnResponse(
        res,
        result.success,
        result.message,
        result.data
      )
    } catch (error) {
      return PlanController.returnResponse(
        res,
        false,
        'Error in Update Plan Controller',
        error
      )
    }
  }
}

export default PlanController
