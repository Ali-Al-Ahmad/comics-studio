import User from './UserModel.js'
import Admin from './AdminModel.js'
import Plan from './PlanModel.js'
import Character from './CharacterModel.js'

Plan.hasMany(User, { foreignKey: 'plan_id' })
User.belongsTo(Plan, { foreignKey: 'plan_id' })

User.hasMany(Character, { foreignKey: 'user_id' })
Character.belongsTo(User, { foreignKey: 'user_id' })

export { Admin, User, Plan, Character }
