// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres",
//     logging: false,
//     pool: {
//       max: 30,
//       min: 0,
//       idle: 30000,
//       acquire: 5000,
//     },
//   }
// );

// module.exports = sequelize;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 30,
      min: 0,
      idle: 30000,
      acquire: 5000,
    },
    dialectOptions: {
      ssl: {
        require: true,          // Enforces SSL
        rejectUnauthorized: false, // Needed for Render's self-signed certificate
      },
    },
  }
);

module.exports = sequelize;
