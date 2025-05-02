import sequelize from '../../config/Connection.js'
import { DataTypes } from 'sequelize'

const Character = sequelize.define(
  'Character',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      allowNull: true,
      unique: 'unique_user_character',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_user_character',
      validate: {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name must not be empty' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'description is required' },
        notEmpty: { msg: 'description must not be empty' },
      },
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
  {
    tableName: 'characters',
  }
)

export default Character
