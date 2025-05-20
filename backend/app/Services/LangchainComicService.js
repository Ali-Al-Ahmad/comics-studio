import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { JsonOutputParser } from 'langchain/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { comicGenerationPrompt } from '../Schemas/ComicGenerationPrompt.js'
import Service from './Service.js'
import Replicate from 'replicate'

export default class LangchainComicService extends Service {



}
