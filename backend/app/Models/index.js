import User from './UserModel.js'
import Admin from './AdminModel.js'
import Plan from './PlanModel.js'

Plan.hasMany(User, { foreignKey: 'plan_id' })
User.belongsTo(Plan, { foreignKey: 'plan_id' })

export { Admin, User, Plan }
