import express from 'express'

import AdminController from '../app/Http/Controllers/AdminController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { AdminByIdRequest } from '../app/Http/Requests/Admin/AdminByIdRequest.js'
import { UpdateAdminRequest } from '../app/Http/Requests/Admin/AdminUpdateRequest.js'

const router = express.Router()

router.get('/', AdminController.getAllAdmins)

router.get('/:id', AdminByIdRequest, validateRequest, AdminController.getAdminById)

router.put('/:id', UpdateAdminRequest, validateRequest, AdminController.updateAdmin)

router.delete('/:id', AdminByIdRequest, validateRequest, AdminController.deleteAdmin)

export default router
