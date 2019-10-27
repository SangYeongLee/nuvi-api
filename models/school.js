'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    public_id: {
      type:DataTypes.STRING,
      unique:true
    },
    schoolName: DataTypes.STRING,
    region: DataTypes.STRING,
    emhs: DataTypes.STRING,


  }, {});
  School.associate = function(models) {
    //hasMany  user
    School.hasMany(models.Kiosk);

    School.hasMany(models.Student,{foreignKey:"schoolUniqueNum",sourceKey:"public_id"});

    School.hasMany(models.Parent);
  };
  return School;
};
