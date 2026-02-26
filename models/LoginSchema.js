const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const LoginSchema = sequelize.define(
  "Login",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(255), allowNull: true },
    password: { type: DataTypes.STRING(255), allowNull: true },
     is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    modelName: "Login",
    tableName: "logins",
    timestamps: true,
    underscored: true,
    defaultScope: { attributes: { exclude: ["password"] } },
    hooks: {
      beforeCreate: async (member) => {
        if (member.password) {
          member.password = await bcrypt.hash(member.password, 10);
        }
      },
      beforeUpdate: async (member) => {
        if (member.changed("password") && member.password) {
          member.password = await bcrypt.hash(member.password, 10);
        }
      },
    },
    indexes: [
      { unique: true, fields: ["username"] },
    ],
  }
);

module.exports = LoginSchema;
