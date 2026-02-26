const { Model, DataTypes } = require("sequelize");

class ArticleSchema extends Model {
  static associate(models) {
    ArticleSchema.belongsTo(models.Author, {
      foreignKey: "author_id",
      as: "author",
    });
  }

  static initModel(sequelize) {
    ArticleSchema.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

        title: { type: DataTypes.STRING(500), allowNull: false },

        body: { type: DataTypes.STRING(500), allowNull: true },

        tags: { type:DataTypes.ARRAY(DataTypes.STRING), allowNull: false },

        is_published: { type: DataTypes.BOOLEAN, defaultValue: false },
        author_id: { type: DataTypes.INTEGER, allowNull: false },
      },
      {
        sequelize,
        modelName: "Article",
        tableName: "articles",
        timestamps: true,
        underscored: true,
        indexes: [
          { fields: ["author_id"] },
          { fields: ["is_published"] },
        ],
      }
    );
    return ArticleSchema;
  }
}

module.exports = ArticleSchema;