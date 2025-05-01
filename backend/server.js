import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

//Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./'))

//Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
