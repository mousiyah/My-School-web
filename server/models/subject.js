"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    static associate(models) {
      subject.hasMany(models.groupSubject);
    }
  }
  subject.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "subject",
    }
  );
  return subject;
};
