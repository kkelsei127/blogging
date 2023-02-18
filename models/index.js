// import models
const Comment = require('./comment');
const Post = require('./post');
const User = require('./user');


// Post belongsTo user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

// post has many comment
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });

//comment belongsto user
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
