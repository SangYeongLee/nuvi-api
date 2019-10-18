'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    allergy: DataTypes.STRING,
    special: DataTypes.STRING
  }, {});
  Food.associate = function(models) {
    //belongs to Many supplyAndLeft
    Food.hasMany(models.SupplyAndLeft);
  };
  return Food;
};
