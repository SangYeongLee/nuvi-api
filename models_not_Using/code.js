'use strict';
module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define('Code', {
    code: DataTypes.STRING,
    occupied: DataTypes.BOOLEAN,
  }, {});
  Code.associate = function(models) {
    // associations can be defined here
  };
  return Code;
};
