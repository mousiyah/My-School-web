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

      group.belongsToMany(models.subject, { through: 'groupSubjects' });

    }
  }
  group.init({
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    letter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.year}${this.letter}`;
      }
    },
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
