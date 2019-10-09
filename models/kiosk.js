'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kiosk = sequelize.define('Kiosk', {
    identify_num: DataTypes.STRING
  }, {});
  Kiosk.associate = function(models) {
    // associations can be defined here
    Kiosk.belongsTo(models.School);
  };
  return Kiosk;
};
