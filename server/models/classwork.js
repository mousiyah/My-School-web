'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classwork extends Model {
    static associate(models) {

      classwork.belongsTo(models.lesson, {
        foreignKey: {
          name: 'lessonId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

    }
  }
  classwork.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'classwork',
  });
  return classwork;
};