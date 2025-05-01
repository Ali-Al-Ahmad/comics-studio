import sequelize from '../../config/Connection.js'
import { DataTypes } from 'sequelize'

const Admin = sequelize.define(
  'Admin',
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
  },
  {
    tableName: 'admins',
  }
)

Admin.prototype.toJSON = function () {
  const admin = { ...this.get() }
  delete admin.password
  return admin
}

export default Admin
