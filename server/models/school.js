'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class school extends Model {
    static associate(models) {

      school.hasMany(models.group);

      school.hasMany(models.teacher);

      school.hasMany(models.room);

      school.belongsTo(models.city, {
        foreignKey: {
          name: 'cityId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });
      
    }
  }
  
  school.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    postcode: {
      type: DataTypes.STRING
    },     
    phone: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'school',
  });
  
  return school;
};
