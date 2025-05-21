import Service from './Service.js'
import { Book, Comic, User } from '../Models/index.js'
import OpenAI from 'openai'
import Replicate from 'replicate'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { comicGenerationPrompt } from '../Schemas/ComicGenerationPrompt.js'

export default class ComicService extends Service {
  static async all() {
    try {
      const all_comics = await Comic.findAll({
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All comics', all_comics)
    } catch (error) {
      this.handleError(error, 'Error getting all comics')
    }
  }

  static async byId(id) {
    try {
      const comicData = await Comic.findByPk(id)
      return this.return(true, 'Comic retrieved successfully', comicData)
    } catch (error) {
      this.handleError(error, 'Error getting Comic by ID')
    }
  }

  static async add(req) {
    try {
      const newComic = await Comic.create(req.body)

      return this.return(true, 'added Comic data', newComic)
    } catch (error) {
      this.handleError(error, 'Error adding Comic')
    }
  }

  static async delete(id) {
    try {
      await Comic.destroy({ where: { id } })
      return this.return(true, 'Comic deleted successfully')
    } catch (error) {
      this.handleError(error, 'Error deleting Comic')
    }
  }
  static async update(req) {
    try {
      const id = req.params?.id
      const allComicData = req.body || {}

      await Comic.update(allComicData, { where: { id } })
      const comic = await Comic.findByPk(id)

      return this.return(true, 'Updated comic data', comic)
    } catch (error) {
      this.handleError(error, 'Error updating comic')
    }
  }
  static async generateReplicateComics(req) {
    try {
      const {
        user_prompt,
        given_character_id,
        character_image_path,
        comic_style,
      } = req.body
      const given_image = req.file?.path || character_image_path

      const user = await User.findByPk(req.user.id)

      if (user?.credits && user.credits < 1) {
        return this.return(
          false,
          "You don't have enough credits to generate a comic"
        )
      }
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      })

      const content = await this._generateComicStoryContent(openai, user_prompt)
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
      const { new_book, savedComics } = await this._saveComicToDatabase(
        req.user.id,
        user_prompt,
        content,
        urls_images,
        given_character_id,
        character_image_path
      )

      await User.update(
        { credits: user.credits - 1 },
        { where: { id: req.user.id } }
      )

      return this.return(true, 'Generated comic data', {
        user_id: req.user.id,
        book: new_book,
        comics: savedComics,
      })
    } catch (error) {
      this.handleError(error, 'Error generating comic')
    }
  }

  static async _generateComicStoryContent(openai, user_prompt) {
    const systemPrompt = comicGenerationPrompt

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: user_prompt },
      ],
      temperature: 0.7,
    })

    const contentString = response.choices[0].message.content
    let content

    try {
      content = JSON.parse(contentString)

      if (!content.prompt_array) {
        console.warn('Warning: Generated content is missing prompt_array')
      }
      if (!content.captions || !Array.isArray(content.captions)) {
        console.warn('Warning: Generated content has invalid captions')
      }
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      content = {
        prompt_array: user_prompt,
        captions: [`Comic based on: ${user_prompt}`],
        general_prompt: user_prompt,
      }
    }

    return content
  }

  static async _processAndEncodeImage(given_image, character_image_path) {
    let encodedImage

    if (given_image) {
      try {
        const inputImageBuffer = await fs.readFile(given_image)
        const processedImageBuffer = await sharp(inputImageBuffer)
          .resize({
            width: 512,
            height: 512,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({ quality: 90 })
          .toBuffer()

        const base64Image = processedImageBuffer.toString('base64')
        encodedImage = `data:image/jpeg;base64,${base64Image}`
      } catch (fileError) {
        console.error(`Error processing image from ${given_image}:`, fileError)
        encodedImage = this._getFallbackImage()
      }
    } else {
      encodedImage = this._getFallbackImage()
    }

    return encodedImage
  }

  static _getFallbackImage() {
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIHMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q=='
  }

  static async _generateComicPanels(
    replicate,
    content,
    encodedImage,
    given_image,
    comic_style,
    character_image_path,
    given_character_id
  ) {
    try {
      const output = await replicate.run(
        'camenduru/story-diffusion:a43c7e0e4bce75ee98445b20b244240d1109e30a46bf7719958fd0a69ab29e8e',
        {
          input: {
            sa32_: 0.5,
            sa64_: 0.5,
            seed_: 0,
            G_width: 512,
            G_height: 512,
            num_steps: 35,
            style: comic_style || 'Comic book',
            comic_type: 'Classic Comic Style',
            model_type: given_image
              ? 'Using Ref Images'
              : 'Only Using Textual Description',
            input_image: encodedImage,
            prompt_array: content?.prompt_array,
            general_prompt: content?.general_prompt,
            negative_prompt:
              'bad anatomy, bad hands, missing fingers, extra fingers, three hands, three legs, bad arms, missing legs, missing arms, poorly drawn face, bad face, fused face, cloned face, three crus, fused feet, fused thigh, extra crus, ugly fingers, horn, cartoon, cg, 3d, unreal, animate, amputation, disconnected limbs',
            id_length_: 2,
            guidance_scale: 5,
            Ip_Adapter_Strength: 0.5,
            style_strength_ratio: 20,
          },
        }
      )

      if (!output || output.length === 0) {
        throw new Error('Replicate API returned empty results')
      }

      return output
    } catch (replicateError) {
      console.error('Error during Replicate API call:', replicateError)
      throw new Error(`Failed to generate images: ${replicateError.message}`)
    }
  }

  static async _saveComicToDatabase(
    userId,
    user_prompt,
    content,
    urls_images,
    given_character_id,
    character_image_path
  ) {
    try {
      const savedComics = []
      const characterId = given_character_id || null

      const new_book = await Book.create({
        title: user_prompt.slice(0, 100),
        user_id: userId,
        image_url: urls_images[urls_images.length - 1],
        character_id: characterId,
        created_at: new Date(),
        updated_at: new Date(),
      })

      for (let i = 0; i < urls_images.length - 1; i++) {
        const caption =
          content.captions && i < content.captions.length
            ? content.captions[i]
            : `Panel ${i + 1}`
        const comicData = {
          caption: caption,
          image_url: urls_images[i],
          book_id: new_book.id,
          created_at: new Date(),
          updated_at: new Date(),
        }

        try {
          const newComic = await Comic.create(comicData)
          savedComics.push(newComic)
        } catch (saveError) {
          console.error(`Error saving comic panel ${i + 1}:`, saveError)
        }
      }

      return { new_book, savedComics }
    } catch (dbError) {
      console.error('Database error during comic creation:', dbError)
      throw dbError
    }
  }
}
