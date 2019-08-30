'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    schoolName: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    classNumber: DataTypes.INTEGER
  }, {});
  School.associate = function(models) {
    //hasMany  user
    School.hasMany(models.User);

    //hasMany student
    School.hasMany(models.Student);
  };
  return School;
};
