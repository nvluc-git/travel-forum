"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Articles, {
        foreignKey: "articleId",
        targetKey: "id",
        as: "articleData",
      });
      Comments.belongsTo(models.Accounts, {
        foreignKey: "accountId",
        targetKey: "id",
        as: "accountData",
      });
    }
  }
  Comments.init(
    {
      content: DataTypes.TEXT,
      articleId: DataTypes.INTEGER,
      accountsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
