"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Types extends Model {
    static associate(models) {
      Types.hasMany(models.Articles);
    }
  }
  Types.init({ name: DataTypes.STRING }, { sequelize, modelName: "Types" });
  return Types;
};
