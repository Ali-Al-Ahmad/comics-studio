import express from 'express'
import { validateRequest } from '../app/Middlewares/validateRequest.js'
import { GenerateComicRequest } from '../app/Http/Requests/Comic/GenerateComicsRequest.js'
import upload from '../app/Middlewares/uploadWithMulter.js'
import Controller from '../app/Http/Controllers/Controller.js'
import LangchainComicService from '../app/Services/LangchainComicService.js'

const router = express.Router()

const generateLangchainComic = async (req, res) => {
  try {
  } catch (error) {}
}

export default router
