'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupSubject extends Model {
    static associate(models) {

      groupSubject.belongsTo(models.teacher, {
        foreignKey: {
          name: 'teacherId',
          allowNull: true,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
    });
    }
  }
  groupSubject.init({

  }, {
    sequelize,
    timestamps: true,
    modelName: 'groupSubject',
  });
  return groupSubject;
};