"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studentHomework extends Model {
    static associate(models) {}
  }
  studentHomework.init(
    {
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "studentHomework",
    }
  );
  return studentHomework;
};
