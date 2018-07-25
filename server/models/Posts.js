const Sequelize = require('sequelize');

module.exports = (app) => {
  const Posts = {
    title: Sequelize.STRING,
    slug: {
      type: Sequelize.STRING,
      unique: true
    },
    // Cover image mode : cover | contain
    cover: Sequelize.STRING,
    // Cover image position : top | center | bottom
    position: Sequelize.STRING,
    // Cover image name
    image: Sequelize.STRING,
    // Cover image b64 placeholder
    placeholder: Sequelize.TEXT,
    metaDescription: Sequelize.STRING,
    summary: Sequelize.STRING,
    body: Sequelize.TEXT,
    readTime: Sequelize.INTEGER,
    type: Sequelize.ENUM('page', 'post'),
    published: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  };

  return app.sequelize.define('Posts', Posts);
};