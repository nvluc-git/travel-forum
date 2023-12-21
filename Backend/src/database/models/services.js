"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.belongsTo(models.Accounts, {
        foreignKey: "accountId",
        targetKey: "id",
        as: "accountData",
      });
    }
  }
  Services.init(
    {
      title: DataTypes.STRING,
      linkTo: DataTypes.STRING,
      image: DataTypes.STRING,
      filename: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
