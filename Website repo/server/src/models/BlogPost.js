const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BlogPost = sequelize.define('BlogPost', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:        { type: DataTypes.STRING, allowNull: false },
  slug:         { type: DataTypes.STRING, allowNull: false, unique: true },
  excerpt:      { type: DataTypes.STRING(300), allowNull: false },
  content:      { type: DataTypes.TEXT('long'), allowNull: false },
  authorName:   { type: DataTypes.STRING, allowNull: false },
  authorRole:   { type: DataTypes.STRING },
  authorAvatar: { type: DataTypes.STRING },
  category:     { type: DataTypes.ENUM('AI Strategy', 'Case Study', 'Technology', 'Industry Insights', 'Research'), allowNull: false },
  tags:         { type: DataTypes.JSON, defaultValue: [] },
  domain:       { type: DataTypes.ENUM('BFSI', 'Healthcare', 'Manufacturing', 'Defense', 'Government', 'Technology', 'General') },
  coverImage:   { type: DataTypes.STRING },
  published:    { type: DataTypes.BOOLEAN, defaultValue: false },
  publishedAt:  { type: DataTypes.DATE },
  readTime:     { type: DataTypes.INTEGER },
}, { timestamps: true });

BlogPost.beforeSave((post) => {
  if (post.content) {
    post.readTime = Math.ceil(post.content.split(/\s+/).length / 200);
  }
});

module.exports = BlogPost;
