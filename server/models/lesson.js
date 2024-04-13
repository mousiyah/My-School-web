'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
    static associate(models) {
      
      lesson.belongsTo(models.subject, {
        foreignKey: {
          name: 'subjectId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      lesson.belongsTo(models.group, {
        foreignKey: {
          name: 'groupId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      lesson.belongsTo(models.room, {
        foreignKey: {
          name: 'roomId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      lesson.belongsTo(models.teacher, {
        foreignKey: {
          name: 'teacherId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      lesson.hasOne(models.homework);

      lesson.hasOne(models.classwork);
      
      lesson.hasMany(models.mark);

      lesson.hasMany(models.attendance);

    }
  }
  lesson.init({
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'lesson'
  });
  return lesson;
};