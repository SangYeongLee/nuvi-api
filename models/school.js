'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    public_id: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    region: DataTypes.STRING,
    emhs: DataTypes.STRING,


  }, {});
  School.associate = function(models) {
    //hasMany  user
    School.hasMany(models.Kiosk);

    School.hasMany(models.Student);

    School.hasMany(models.Parent);
  };
  return School;
};
