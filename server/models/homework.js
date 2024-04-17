'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homework extends Model {
    static associate(models) {

      homework.belongsTo(models.lesson, {
        foreignKey: {
          name: 'lessonId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      homework.belongsToMany(models.student, { through: 'studentHomeworks' });
      homework.hasMany(models.mark, {
        foreignKey: {
          name: 'relatedId',
          allowNull: true,
          constraints: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      });

    }
  }
  homework.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isSubmittable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    modelName: 'homework',
    tableName: 'homeworks',
  });
  return homework;
};