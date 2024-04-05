'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    static associate(models) {

      group.hasMany(models.student);
      
      group.hasMany(models.lesson);

      group.belongsTo(models.school, {
        foreignKey: {
          name: 'schoolId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

      group.belongsTo(models.teacher, {
          foreignKey: {
            name: 'headteacherId',
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        });

    }
  }
  group.init({
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'group',
    indexes: [
      {
        unique: true,
        fields: ['schoolId', 'year', 'group']
      }
    ]
  });
  return group;
};
