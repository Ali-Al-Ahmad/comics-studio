import User from './UserModel.js'
import Admin from './AdminModel.js'
import Plan from './PlanModel.js'
import Character from './CharacterModel.js'
import Book from './BookModel.js'
import Comic from './ComicModel.js'

Plan.hasMany(User, { foreignKey: 'plan_id' })
User.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' })

User.hasMany(Character, { foreignKey: 'user_id' })
Character.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(Book, { foreignKey: 'user_id' })
Book.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

Character.hasMany(Book, { foreignKey: 'character_id' })
Book.belongsTo(Character, { foreignKey: 'character_id', as: 'character' })

Book.hasMany(Comic, { foreignKey: 'book_id' })
Comic.belongsTo(Book, { foreignKey: 'book_id', as: 'book' })

export { Admin, User, Plan, Character, Book, Comic }
