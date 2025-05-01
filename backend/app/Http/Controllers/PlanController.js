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
}

export default PlanController
