import { validationResult } from 'express-validator'
import ResponseTrait from '../Traits/ResponseTrait.js'

export function validateRequest(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log("formRequest validator errors",errors);
    //errors.array().map to show only needed attributes and hide others
    return ResponseTrait.response(
      res,
      false,
      'Request validation error',
      errors.array().map((err) => ({
        type: err.type,
        msg: err.msg,
      })),
      422
    )
  }
  next()
}
