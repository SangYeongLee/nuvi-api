'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    //belongs to user
    Post.belongsTo(models.User)

    //has many replies
    Post.hasMany(models.Reply)
  };
  return Post;
};
