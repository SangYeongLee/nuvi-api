'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    student_num: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    rfid: DataTypes.STRING,
    chat_id:DataTypes.STRING,
    addmission:DataTypes.INTEGER,
    allergy: DataTypes.STRING



  }, {});
  Student.associate = function(models) {
    //has Many supplyAndLeft
    Student.hasMany(models.SupplyAndLeft);

    //belongs To school
    Student.belongsTo(models.School_sub);
  };
  return Student;
};
