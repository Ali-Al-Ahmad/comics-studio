import ResponseTrait from '../Traits/ResponseTrait.js'

export default function checkPlanAccess(allowedPlans) {
  return (req, res, next) => {
    const user = req.user

    if (!user || !allowedPlans.includes(user.plan_id)) {
      return ResponseTrait.response(
        res,
        false,
        'Access denied: Insufficient plan level',
        null,
        403
      )
    }
    next()
  }
}
