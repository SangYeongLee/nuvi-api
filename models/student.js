 'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    uniqueNum:{
      type:DataTypes.STRING,
      unique:true,
    },
    name: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    student_num: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    class_num:DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    rfid: DataTypes.STRING,
    chat_id:DataTypes.STRING,
    addmission:DataTypes.INTEGER,
    allergy: DataTypes.STRING,
    participate:DataTypes.BOOLEAN,



  }, {});
  Student.associate = function(models) {
    //has Many supplyAndLeft
    Student.hasMany(models.SupplyAndLeft,{foreignKey:"studentUniqueNum", sourceKey:"uniqueNum"});

    //belongs To school
    Student.belongsTo(models.School,{foreignKey:"schoolUniqueNum",targetKey:"public_id"});
  };
  return Student;
};
