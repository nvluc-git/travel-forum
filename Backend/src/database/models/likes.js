"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      Likes.belongsTo(models.Articles, {
        foreignKey: "articleId",
        targetKey: "id",
        as: "articleData",
      });
      Likes.belongsTo(models.Accounts, {
        foreignKey: "accountId",
        targetKey: "id",
        as: "accountData",
      });
    }
  }
  Likes.init(
    {
      articleId: DataTypes.INTEGER,
      accountsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
