"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    static associate(models) {
      Accounts.belongsTo(models.Roles, {
        foreignKey: "roleId",
        targetKey: "id",
        as: "roleData",
      });
      Accounts.hasMany(models.Articles);
      Accounts.hasMany(models.Services);
      Accounts.hasMany(models.Comments);
      Accounts.hasMany(models.Likes);
      Accounts.hasMany(models.Bookmarks);
    }
  }
  Accounts.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      verificationToken: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      username: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthday: DataTypes.STRING,
      gender: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      filename: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Accounts",
    }
  );
  return Accounts;
};
