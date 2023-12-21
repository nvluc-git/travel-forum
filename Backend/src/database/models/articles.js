"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    static associate(models) {
      Articles.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "categoryData",
      });
      Articles.belongsTo(models.Types, {
        foreignKey: "typeId",
        targetKey: "id",
        as: "typeData",
      });
      Articles.belongsTo(models.Accounts, {
        foreignKey: "accountId",
        targetKey: "id",
        as: "accountData",
      });
      Articles.hasMany(models.Comments);
      Articles.hasMany(models.Likes);
      Articles.hasMany(models.Bookmarks);
    }
  }
  Articles.init(
    {
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      filename: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Articles",
    }
  );
  return Articles;
};
