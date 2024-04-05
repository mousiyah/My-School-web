'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      
      room.belongsTo(models.school, {
        foreignKey: {
          name: 'schoolId',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      });

    }
  }
  room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'room',
  });
  return room;
};