"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    static associate(models) {
      attendance.belongsTo(models.lesson, {
        foreignKey: {
          name: "lessonId",
          allowNull: false,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });

      attendance.belongsTo(models.student, {
        foreignKey: {
          name: "studentId",
          allowNull: false,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });
    }
  }
  attendance.init(
    {
      attended: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "attendance",
      tableName: "attendances",
    }
  );
  return attendance;
};
