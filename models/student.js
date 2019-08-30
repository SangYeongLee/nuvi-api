'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
  }, {});
  Student.associate = function(models) {
    //hasone supplyAndLeft
    Student.hasOne(models.SupplyAndLeft);

    //belongs To school
    Student.belongsTo(models.School);
  };
  return Student;
};
