'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacherSubject extends Model {
    static associate(models) {
      
    }
  }
  teacherSubject.init({

  }, {
    sequelize,
    modelName: 'teacherSubject',
  });
  return teacherSubject;
};