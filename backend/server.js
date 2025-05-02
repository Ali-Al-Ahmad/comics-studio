import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//sequelize db connection
import { initDatabase } from './config/Connection.js'

//middlewares imports
import logReuestBodyData from './app/Middlewares/RequestBodyData.js'
import { authenticateToken } from './app/Middlewares/AuthMiddleware.js'

//routes imports
import authRoutes from './routes/AuthRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import adminRoutes from './routes/AdminRoutes.js'
import planRoutes from './routes/PlanRoutes.js'
import characterRoutes from './routes/CharacterRoutes.js'
import bookRoutes from './routes/BookRoutes.js'
import comicRoutes from './routes/ComicRoutes.js'

dotenv.config()

const app = express()

//Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./'))

app.use(logReuestBodyData)

//routes api
app.use('/api/v1/auth', authRoutes)

//routes needs authentication
app.use('/api/v1/users', authenticateToken, userRoutes)
app.use('/api/v1/admins', authenticateToken, adminRoutes)
app.use('/api/v1/plans', authenticateToken, planRoutes)
app.use('/api/v1/characters', authenticateToken, characterRoutes)
app.use('/api/v1/books', authenticateToken, bookRoutes)
app.use('/api/v1/comics', authenticateToken, comicRoutes)


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
