import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import logReuestBodyData from './app/Middlewares/RequestBodyData'

dotenv.config()

const app = express()

//Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./'))

app.use(logReuestBodyData)

//Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
