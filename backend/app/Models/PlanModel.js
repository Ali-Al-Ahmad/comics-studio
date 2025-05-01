import sequelize from '../../config/Connection.js'
import { DataTypes } from 'sequelize'

const Plan = sequelize.define(
  'Plan',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Plan name is required' },
        notEmpty: { msg: 'Plan name must not be empty' },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: 'Price must be a valid decimal number' },
        min: {
          args: [0],
          msg: 'Price must be at least 0',
        },
      },
    },

    credits: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: 'Credits must be a valid decimal number' },
        min: {
          args: [0],
          msg: 'Credits must be at least 0',
        },
      },
    },
  },
  { tableName: 'plans' }
)

export default Plan
