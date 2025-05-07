import Service from './Service.js'
import { Comic } from '../Models/index.js'
import OpenAI from 'openai'
import Replicate from 'replicate'
import fs from 'fs/promises'
import path from 'path'

export default class ComicService extends Service {
  static async all() {
    try {
      const all_comics = await Comic.findAll({
        order: [['id', 'DESC']],
      })
      return this.return(true, 'All comics', all_comics)
    } catch (error) {
      return this.return(false, 'Error getting all comics', error)
    }
  }

  static async byId(id) {
    try {
      const comicData = await Comic.findByPk(id)
      return this.return(true, 'Comic retrieved successfully', comicData)
    } catch (error) {
      return this.return(false, 'Error getting Comic by ID', error)
    }
  }

  static async add(req) {
    try {
      const newComic = await Comic.create(req.body)

      return this.return(true, 'added Comic data', newComic)
    } catch (error) {
      return this.return(false, 'Error adding Comic', error)
    }
  }

  static async delete(id) {
    try {
      await Comic.destroy({ where: { id } })
      return this.return(true, 'Comic deleted successfully')
    } catch (error) {
      return this.return(false, 'Error deleting Comic', error)
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
      console.log(error)
      return this.return(false, 'Error updating comic', error)
    }
  }

  static async generateReplicateComics(req) {
    try {
      const { userPrompt } = req.body
      const image_path = req.file.path

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      })

      const systemPrompt = `
You are a creative assistant trained to generate comic book-style stories for image generation.

When given a short user prompt, follow these exact steps:

1. Expand the prompt into a dynamic, visually rich short story suitable for comic book art.
2. Divide the story into **exactly 6 scenes**, using **1 vivid, visual sentence per scene**.
   - Use energetic, comic-style language.
   - Each scene must describe a **key action or emotion** that drives the story forward.
3. **Each scene must end with '#' followed by a short, dramatic caption** summarizing that scene in comic style.
   - Captions should be short (3–7 words), punchy, and emotionally resonant.

   Return the following in **valid JSON format**:

- **"prompt_array"**: A single string with all 6 scene descriptions, joined by '\\n'.
- **"captions"**: A JSON array of the 6 captions, in order.
- **"general_prompt"**: A short visual description of the main character, including the keyword **'img'** exactly once.

Additional Guidelines:
- Assume each scene will be illustrated in a comic panel.
- Be imaginative and cinematic with descriptions (e.g., weather, lighting, movement).
- If gender or appearance is unclear, make reasonable creative choices.
- Stay within genre expectations (heroic, mysterious, magical, etc.).

   
`

    } catch (error) {
      console.log(error)
      return this.return(false, 'Error generating comic', error)
    }
  }
}
