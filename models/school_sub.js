'use strict';
module.exports = (sequelize, DataTypes) => {
  const School_sub = sequelize.define('School_sub', {
    grade: DataTypes.INTEGER,
    classNumber: DataTypes.INTEGER
  }, {});
  School_sub.associate = function(models) {

    //hasMany student
    School_sub.hasMany(models.Student);

    School_sub.belongsTo(models.School)

  };
  return School_sub;
};
