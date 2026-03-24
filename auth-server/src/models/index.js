const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');

// Many-to-Many: User <-> Role through UserRole
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', as: 'users' });

module.exports = { User, Role, UserRole };
