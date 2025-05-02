import sequelize from '../../config/Connection.js'
import { DataTypes } from 'sequelize'
import Plan from './PlanModel.js'

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be a valid email' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password must not be empty' },
        len: {
          args: [6],
          msg: 'Password must be at least 6 characters long',
        },
      },
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First name is required' },
        notEmpty: { msg: 'First name must not be empty' },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last name is required' },
        notEmpty: { msg: 'Last name must not be empty' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [8],
          msg: 'phone must be at least 8 characters long',
        },
      },
    },

    profile_picture: { type: DataTypes.STRING, allowNull: true },
    credits: { type: DataTypes.INTEGER, defaultValue: 0 },
    plan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Plan,
        key: 'id',
      },
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    defaultScope: {
      include: [{ model: Plan, as: 'plan' }],
    },
  }
)

User.prototype.toJSON = function () {
  const user = { ...this.get() }
  delete user.password
  return user
}

export default User
