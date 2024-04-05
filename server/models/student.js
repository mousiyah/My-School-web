'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    static associate(models) {

      student.belongsTo(models.user, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
      });

      student.belongsTo(models.group, {
        foreignKey: {
          name: 'groupId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      student.belongsToMany(models.homework, { through: 'studentHomeworks' });
      student.hasMany(models.mark);

    }
  }
  student.init({

  }, {
    sequelize,
    timestamps: true,
    modelName: 'student',
  });
  return student;
};