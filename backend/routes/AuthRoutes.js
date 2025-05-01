import express from 'express'

import AuthController from '../app/Http/Controllers/AuthController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { LoginRequest } from '../app/Http/Requests/Auth/LoginRequest.js'
import { RegisterRequest } from '../app/Http/Requests/Auth/RegisterRequest.js'

const router = express.Router()

router.post(
  '/register',
  RegisterRequest,
  validateRequest,
  AuthController.registerUser
)

router.post('/login', LoginRequest, validateRequest, AuthController.loginUser)

export default router
