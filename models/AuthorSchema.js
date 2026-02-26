const { Model, DataTypes } = require("sequelize");
class AuthorSchema extends Model {
  static associate(models) {
    AuthorSchema.hasMany(models.Article, {
      foreignKey: "author_id",
      as: "articles",
      onDelete: "CASCADE",
    });
  }

  static initModel(sequelize) {
    AuthorSchema.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(255), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      },
      {
        sequelize,
        modelName: "Author",
        tableName: "authors",
        timestamps: true,
        underscored: true,
      }
    );
    return AuthorSchema;
  }
}

module.exports = AuthorSchema;
