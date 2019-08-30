'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    //belongs to school
    User.belongsTo(models.School);

    //has many Posts
    User.hasMany(models.Post);

    //has many Replies
    User.hasMany(models.Reply);
  };
  return User;
};
