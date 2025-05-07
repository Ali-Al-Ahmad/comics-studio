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

---

### Format Example 1 (Prompt: "Spiderman saves the city"):

{
  "prompt_array": "Spiderman swings through the sunset skyline. #He races to save the city.\\nExplosions erupt below as citizens flee. #Chaos in the streets.\\nSpiderman battles a giant robot atop a tower. #Hero versus machine.\\nThe tower crumbles as he pulls a child to safety. #A narrow escape.\\nHe webs up the villain in front of cheering crowds. #Justice served.\\nHe stands tall on a rooftop under the stars. #A hero’s silhouette.",
  "captions": [
    "He races to save the city.",
    "Chaos in the streets.",
    "Hero versus machine.",
    "A narrow escape.",
    "Justice served.",
    "A hero’s silhouette."
  ],
  "general_prompt": "Spiderman img, red and blue suit, athletic build, bright eyes, confident and agile pose"
}

---

### Format Example 2 (Prompt: "A female character living in a forest"):

{
  "prompt_array": "At home, she reads a newspaper article about a hidden treasure deep in the forest. #The forest hides a secret.\\nWith determination, she packs a bag and sets off down a dirt road. #She begins her quest.\\nDriving toward the forest, her eyes gleam with excitement. #Treasure awaits.\\nAlone in the dark woods, she gasps as eerie sounds echo. #Fear creeps in.\\nSuddenly, an ancient wooden house appears through the trees. #The treasure house revealed.\\nInside, gold glitters as she bursts into joyous laughter. #Triumph and wonder.",
  "captions": [
    "The forest hides a secret.",
    "She begins her quest.",
    "Treasure awaits.",
    "Fear creeps in.",
    "The treasure house revealed.",
    "Triumph and wonder."
  ],
  "general_prompt": "a woman img, wearing a white T-shirt, blue loose hair"
}

---

### Format Example 3 (Prompt: "A good parent spending the day with their children"):

{
  "prompt_array": "A kind father wakes his kids early for an adventure. #A joyful start to the day.\\nThey pack snacks and toys into a backpack together. #Everyone helps with excitement.\\nAt the park, they fly a kite under clear blue skies. #Laughter fills the air.\\nThey sit on a picnic blanket, sharing sandwiches and stories. #A peaceful midday break.\\nIn the woods, they build a small fort out of branches. #Imagination comes alive.\\nAs the sun sets, they walk home hand in hand. #A perfect family day.",
  "captions": [
    "A joyful start to the day.",
    "Everyone helps with excitement.",
    "Laughter fills the air.",
    "A peaceful midday break.",
    "Imagination comes alive.",
    "A perfect family day."
  ],
  "general_prompt": "father img, wearing a casual hoodie and jeans, gentle smile, warm eyes, walking with his children outdoors"
}

---

Respond only with valid JSON in this format.
`
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `User Prompt: ${userPrompt}`,
          },
        ],
        temperature: 0.7,
      })

      const contentString = response.choices[0].message.content
      const content = JSON.parse(contentString)

      console.log(content)
      console.log('gen', content?.general_prompt)
      console.log('arr', content?.prompt_array)
      console.log('cap', content?.captions)

      const inputImage = await fs.readFile(image_path)

      const output = await replicate.run(
        'camenduru/story-diffusion:a43c7e0e4bce75ee98445b20b244240d1109e30a46bf7719958fd0a69ab29e8e',
        {
          input: {
            sa32_: 0.5,
            sa64_: 0.5,
            seed_: 0,
            G_width: 768,
            G_height: 768,
            num_steps: 35,
            style: 'Comic book',
            comic_type: 'Classic Comic Style',
            model_type: 'Using Ref Images',
            input_image: inputImage,
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

      const base64Images = output.map((buffer) => buffer.toString('base64'))

      return this.return(true, 'Generated comic data', {
        images: base64Images,
        captions: content.captions,
      })

    } catch (error) {
      console.log(error)
      return this.return(false, 'Error generating comic', error)
    }
  }
}
