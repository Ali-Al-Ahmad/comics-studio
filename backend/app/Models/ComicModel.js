import sequelize from '../../config/Connection.js'
import { DataTypes } from 'sequelize'

const Comic = sequelize.define(
  'Comic',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'caption is required' },
        notEmpty: { msg: 'caption must not be empty' },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image URL is required' },
        notEmpty: { msg: 'Image URL must not be empty' },
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
    },
  },
  { tableName: 'comics' }
)

export default Comic
