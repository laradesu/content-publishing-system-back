const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const RegisterSchema = sequelize.define(
  "Register",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: true },
    fullName: { type: DataTypes.STRING(255), allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING(255), allowNull: false },
    username: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    modelName: "Register",
    tableName: "registers",
    timestamps: true,
    underscored: true,
  scopes: {
  withPassword: {
    attributes: {}
  }
},
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
      { unique: true, fields: ["email"] },
      { unique: true, fields: ["username"] },
    ],
  }
);

module.exports = RegisterSchema;
