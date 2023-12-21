"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Accounts);
    }
  }
  Roles.init({ name: DataTypes.STRING }, { sequelize, modelName: "Roles" });
  return Roles;
};
