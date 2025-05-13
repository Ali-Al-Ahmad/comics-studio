import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'
console.log('process in conn:', process.env.PORT)

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_NAME_TEST, NODE_ENV } =
  process.env

const sequelize = new Sequelize(
  NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false, //false/console.log to disable logging
    define: {
      freezeTableName: false,
      timestamps: true,
    },
  }
)

export const initDatabase = async () => {
  const maxRetries = 5
  let attempts = 0

  while (attempts < maxRetries) {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      await sequelize.sync()
      console.log('Database synchronized.')
      break
    } catch (error) {
      attempts++
      if (attempts < maxRetries) {
        console.log('Retrying in 5 seconds...')
        await new Promise((resolve) => setTimeout(resolve, 5000))
      } else {
        console.error('Max retry attempts reached. Exiting.')
        console.error('Unable to connect to the database:', error)
        process.exit(1)
      }
    }
  }
}

export default sequelize
