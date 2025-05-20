import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { JsonOutputParser } from 'langchain/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { comicGenerationPrompt } from '../Schemas/ComicGenerationPrompt.js'
import Service from './Service.js'
import Replicate from 'replicate'

export default class LangchainComicService extends Service {
  static async generateComicStoryWithLangChain(user_prompt) {
    try {
      const model = new ChatOpenAI({
        modelName: 'gpt-4',
        temperature: 0.7,
      })

      const outputParser = new JsonOutputParser()

      const promptTemplate = PromptTemplate.fromTemplate(`
        ${comicGenerationPrompt}
        
        User Request: {user_prompt}
      `)

      const chain = RunnableSequence.from([promptTemplate, model, outputParser])

     
    } catch (error) {
      console.error('Error generating comic story with LangChain:', error)

    }
  }


}
