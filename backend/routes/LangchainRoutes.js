import express from 'express'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { GenerateComicRequest } from '../app/Http/Requests/Comic/GenerateComicsRequest.js'
import upload from '../app/Middlewares/uploadWithMulter.js'
import Controller from '../app/Http/Controllers/Controller.js'
import LangchainComicService from '../app/Services/LangchainComicService.js'

const router = express.Router()

const generateLangchainComic = async (req, res) => {
  try {
    const result = await LangchainComicService.generateComicWithLangChain(req)
    return Controller.returnResponse(
      res,
      result.success,
      result.message,
      result.data
    )
  } catch (error) {
    return Controller.returnResponse(
      res,
      false,
      'Error in LangChain Comic Generation',
      error
    )
  }
}



export default router
