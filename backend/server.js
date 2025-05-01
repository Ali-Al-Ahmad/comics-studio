import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//sequelize db connection
import { initDatabase } from './config/Connection.js'

//middlewares imports
import logReuestBodyData from './app/Middlewares/RequestBodyData.js'

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
const startServer = async () => {
  try {
    await initDatabase()
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
}

startServer()
