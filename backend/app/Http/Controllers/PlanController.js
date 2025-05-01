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
}

export default PlanController
