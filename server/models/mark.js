'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mark extends Model {
    static associate(models) {
      
      mark.belongsTo(models.student, {
        foreignKey: {
          name: 'studentId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      mark.belongsTo(models.lesson, {
        foreignKey: {
          name: 'lessonId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      mark.belongsTo(models.homework, {
        foreignKey: {
          name: 'relatedId',
          allowNull: true,
          constraints: false,
        },
        scope: {
          relatedType: 'homework',
        },
      });

      mark.belongsTo(models.classwork, {
        foreignKey: {
          name: 'relatedId',
          allowNull: true,
          constraints: false,
        },
        scope: {
          relatedType: 'classwork',
        },
      });

    }
  }
  mark.init({
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    relatedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    relatedType: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'mark',
  });
  return mark;
};