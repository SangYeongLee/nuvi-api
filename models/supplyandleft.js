'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupplyAndLeft = sequelize.define('SupplyAndLeft', {
    date: DataTypes.DATE,
    food_supply: DataTypes.INTEGER,
    food_left: DataTypes.INTEGER
  }, {});
  SupplyAndLeft.associate = function(models) {
    //belongs to user
    SupplyAndLeft.belongsTo(models.Student);
    //belongs To many food
    SupplyAndLeft.belongsTo(models.Food);
  };
  return SupplyAndLeft;
};
