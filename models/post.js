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
    comment_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'comment',
            key: 'id',
            unique: false
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
