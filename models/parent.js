'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
    name: DataTypes.STRING,
    chat_id: DataTypes.STRING
  }, {});
  Parent.associate = function(models) {
    //belongs to school
    Parent.belongsTo(models.School);

    Parent.belongsTo(models.Student);
  };
  return Parent;
};
