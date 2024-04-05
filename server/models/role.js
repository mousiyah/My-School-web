const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.hasMany(models.user);
    }
  }
  role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'role',
  });
  return role;
};