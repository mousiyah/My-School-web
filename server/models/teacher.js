"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {
    static associate(models) {
      teacher.belongsTo(models.school, {
        foreignKey: {
          name: "schoolId",
          allowNull: false,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });

      teacher.belongsTo(models.user, {
        foreignKey: {
          name: "userId",
          allowNull: false,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      });

      teacher.hasMany(models.groupSubject);

      teacher.hasMany(models.lesson);

      teacher.hasOne(models.group, {
        foreignKey: {
          name: "headteacherId",
          allowNull: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });

      teacher.hasOne(models.groupSubject, {
        foreignKey: {
          name: "teacherId",
          allowNull: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });
    }
  }
  teacher.init(
    {},
    {
      sequelize,
      timestamps: true,
      modelName: "teacher",
    }
  );
  return teacher;
};
