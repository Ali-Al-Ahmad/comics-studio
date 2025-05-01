import express from 'express'

import PlanController from '../app/Http/Controllers/PlanController.js'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { AddPlanRequest } from '../app/Http/Requests/Plan/AddPlanRequest.js'
import { PlanByIdRequest } from '../app/Http/Requests/Plan/GetPlantByIdRequest.js'

const router = express.Router()

router.get('/', PlanController.getAllPlans)

router.get('/:id', PlanByIdRequest, validateRequest, PlanController.getPlanById)

router.post('/', AddPlanRequest, validateRequest, PlanController.addPlan)

router.put('/:id', PlanByIdRequest, validateRequest, PlanController.updatePlan)

router.delete('/:id', PlanByIdRequest, validateRequest, PlanController.deletePlan)

export default router
