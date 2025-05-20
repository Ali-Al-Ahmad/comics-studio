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

      const content = await chain.invoke({
        user_prompt: user_prompt,
      })
      if (!content.prompt_array) {
        console.warn('Warning: Generated content is missing prompt_array')
      }
      if (!content.captions || !Array.isArray(content.captions)) {
        console.warn('Warning: Generated content has invalid captions')
      }

      return content
    } catch (error) {
      console.error('Error generating comic story with LangChain:', error)
      return {
        prompt_array: user_prompt,
        captions: [`Comic based on: ${user_prompt}`],
        general_prompt: user_prompt,
      }
    }
  }

  static async generateComicWithLangChain(req) {
    try {
      const {
        user_prompt,
        given_character_id,
        character_image_path,
        comic_style,
      } = req.body
      const given_image = req.file?.path || character_image_path

      if (req.user?.credits && req.user.credits < 1) {
        return this.return(
          false,
          "You don't have enough credits to generate a comic"
        )
      }

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      })
      const content = await this.generateComicStoryWithLangChain(user_prompt)

      const encodedImage = await this._processAndEncodeImage(
        given_image,
        character_image_path
      )

      const output = await this._generateComicPanels(
        replicate,
        content,
        encodedImage,
        given_image,
        comic_style,
        character_image_path,
        given_character_id
      )

      const urls_images = output.map((buffer) => buffer.toString('base64'))
      if (!urls_images || urls_images.length === 0) {
        throw new Error('No images were generated')
      }



      
    } catch (error) {
      this.handleError(error, 'Error generating comic with LangChain')
    }
  }
}
