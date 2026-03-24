const bcrypt = require('bcryptjs');
const { User, Role, UserRole } = require('../models');
const sequelize = require('../config/database');

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('✅ Database synced.');

    // Create roles
    const adminRole = await Role.create({
      name: 'Admin',
      description: 'Full access to all applications',
    });

    const userRole = await Role.create({
      name: 'User',
      description: 'Access to ZenNotes only',
    });

    console.log('✅ Roles created.');

    // Create demo admin user
    const adminUser = await User.create({
      email: 'admin@saas-ecosystem.com',
      password: 'admin123',
      name: 'Alex Sterling',
      avatar: null,
    });

    await adminUser.addRole(adminRole);
    console.log('✅ Admin user created: admin@saas-ecosystem.com / admin123');

    // Create demo regular user
    const regularUser = await User.create({
      email: 'user@saas-ecosystem.com',
      password: 'user123',
      name: 'Jordan Blake',
      avatar: null,
    });

    await regularUser.addRole(userRole);
    console.log('✅ Regular user created: user@saas-ecosystem.com / user123');

    console.log('\n🎉 Seed completed successfully!');
    console.log('─────────────────────────────────────');
    console.log('Demo Accounts:');
    console.log('  Admin: admin@saas-ecosystem.com / admin123');
    console.log('  User:  user@saas-ecosystem.com / user123');
    console.log('─────────────────────────────────────');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
