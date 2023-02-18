// import models
const Comment = require('./comment');
const Post = require('./post');
const User = require('./user');


// Product belongsTo Category
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

// Category has many Product
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });

  Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  })


  //verify if foreign key is camelcase or not, because they need to match in post/put routes


module.exports = {
  Comment,
  User,
  Post
};
