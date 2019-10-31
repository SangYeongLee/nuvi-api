'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupplyAndLeft = sequelize.define('SupplyAndLeft', {
    date: DataTypes.DATE,
    bld:DataTypes.STRING,
    food_supply: DataTypes.INTEGER,
    food_left: DataTypes.INTEGER,
    supply_time: DataTypes.DATE,
    left_time: DataTypes.DATE,
    photo_supply: DataTypes.STRING,
    photo_left: DataTypes.STRING,
  }, {});
  SupplyAndLeft.associate = function(models) {
    //belongs to user
    SupplyAndLeft.belongsTo(models.Student,{foreignKey:"studentUniqueNum" , targetKey:"uniqueNum"});
    //belongs To many food
    SupplyAndLeft.belongsTo(models.Food);

    SupplyAndLeft.belongsTo(models.Kiosk,{as:"kioskIn", foreignKey:"kioskInId"});

    SupplyAndLeft.belongsTo(models.Kiosk,{as:"kioskOut",foreignKey:"kioskOutId"});
  };
  return SupplyAndLeft;
};
