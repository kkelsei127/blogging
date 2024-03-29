const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: "user", key: "id"}
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: { model: "post", key: "id"}
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;