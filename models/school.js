'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    public_id: DataTypes.STRING,
    region: DataTypes.STRING,
    emhs: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    classNumber: DataTypes.INTEGER
  }, {});
  School.associate = function(models) {
    //hasMany  user
    School.hasMany(models.User);

    //hasMany student
    School.hasMany(models.Student);

    School.hasMany(models.Kiosk);
  };
  return School;
};
