import jwt from 'jsonwebtoken'
import ResponseTrait from '../Traits/ResponseTrait.js'

console.log('process in authMidllewware:', process.env.PORT)

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ResponseTrait.response(
      res,
      false,
      'error',
      {
        error: 'Access denied. Invalid token format.',
      },
      401
    )
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return ResponseTrait.response(
      res,
      false,
      'error',
      {
        error: 'Access denied. Token missing.',
      },
      401
    )
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    console.log('request by:', req.user)

    next()
  } catch (error) {
    return ResponseTrait.response(
      res,
      false,
      'error',
      {
        error: error.message,
      },
      401
    )
  }
}
