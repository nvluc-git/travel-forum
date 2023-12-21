"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notis extends Model {
    static associate(models) {
      Notis.belongsTo(models.Articles, {
        foreignKey: "articleId",
        targetKey: "id",
        as: "articleData",
      });
      Notis.belongsTo(models.Accounts, {
        foreignKey: "accountId",
        targetKey: "id",
        as: "accountData",
      });
    }
  }
  Notis.init(
    {
      content: DataTypes.TEXT,
      articleId: DataTypes.INTEGER,
      accountsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notis",
    }
  );
  return Notis;
};
