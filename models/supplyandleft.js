'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupplyAndLeft = sequelize.define('SupplyAndLeft', {
    date: DataTypes.DATE,
    bld:DataTypes.STRING,
    food_supply: DataTypes.INTEGER,
    food_left: DataTypes.INTEGER,
    supply_time: DataTypes.DATE,
    left_time: DataTypes.DATE
  }, {});
  SupplyAndLeft.associate = function(models) {
    //belongs to user
    SupplyAndLeft.belongsTo(models.Student);
    //belongs To many food
    SupplyAndLeft.belongsTo(models.Food);

    SupplyAndLeft.belongsTo(models.Kiosk);
  };
  return SupplyAndLeft;
};
