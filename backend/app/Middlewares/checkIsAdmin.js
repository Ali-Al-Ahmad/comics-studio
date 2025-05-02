import ResponseTrait from '../Traits/ResponseTrait.js'

export default function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return ResponseTrait.response(
      res,
      false,
      'Access denied: Admins only',
      null,
      403
    )
  }
  next()
}
