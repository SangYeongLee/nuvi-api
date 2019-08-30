'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    from: DataTypes.STRING,
    allergy: DataTypes.BOOLEAN,
    special: DataTypes.STRING
  }, {});
  Food.associate = function(models) {
    //belongs to Many supplyAndLeft
    Food.hasMany(models.SupplyAndLeft);
  };
  return Food;
};
