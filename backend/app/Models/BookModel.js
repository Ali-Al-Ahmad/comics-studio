import sequelize from '../../config/Connection.js'
import { DataTypes } from 'sequelize'

const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Title is required' },
        notEmpty: { msg: 'Title must not be empty' },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    character_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'characters',
        key: 'id',
      },
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image is required' },
        notEmpty: { msg: 'Image must not be empty' },
      },
    },
  },
  { tableName: 'books' }
)

export default Book
