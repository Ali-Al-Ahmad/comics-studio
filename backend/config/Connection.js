import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false, //false/console.log to disable logging
  define: {
    freezeTableName: false,
    timestamps: true,
  },
})

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({force:true})
    console.log('Database synchronized.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default sequelize
