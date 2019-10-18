'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    description: DataTypes.STRING
  }, {});
  Reply.associate = function(models) {
    //belongs to user
    Reply.belongsTo(models.Parent)
    Reply.belongsTo(models.Post)
  };
  return Reply;
};
