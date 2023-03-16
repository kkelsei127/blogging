const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    post_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: "user", key: "id"}
    },
    // comment_id: {
    //   type: DataTypes.STRING,
    //   references: { model: "comment", key: "id"}
    // }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
