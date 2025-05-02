import User from './UserModel.js'
import Admin from './AdminModel.js'
import Plan from './PlanModel.js'
import Character from './CharacterModel.js'
import Book from './BookModel.js'

Plan.hasMany(User, { foreignKey: 'plan_id' })
User.belongsTo(Plan, { foreignKey: 'plan_id' })

User.hasMany(Character, { foreignKey: 'user_id' })
Character.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Book, { foreignKey: 'user_id' })
Book.belongsTo(User, { foreignKey: 'user_id' })

export { Admin, User, Plan, Character, Book }
