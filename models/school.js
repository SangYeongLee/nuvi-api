'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    public_id: DataTypes.STRING,
    region: DataTypes.STRING,
    emhs: DataTypes.STRING,
    schoolName: DataTypes.STRING,

  }, {});
  School.associate = function(models) {
    //hasMany  user
    School.hasMany(models.User);

    School.hasMany(models.Kiosk);
  };
  return School;
};
