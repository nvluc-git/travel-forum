"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmarks extends Model {
    static associate(models) {
      Bookmarks.belongsTo(models.Articles, {
        foreignKey: "articleId",
        targetKey: "id",
        as: "articleData",
      });
      Bookmarks.belongsTo(models.Accounts, {
        foreignKey: "accountId",
        targetKey: "id",
        as: "accountData",
      });
    }
  }
  Bookmarks.init(
    {
      articleId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bookmarks",
    }
  );
  return Bookmarks;
};
