const Sequelize = require('sequelize');

module.exports = (app) => {
  const Posts = {
    title: Sequelize.STRING,
    slug: {
      type: Sequelize.STRING,
      unique: true
    },
    summary: Sequelize.STRING,
    body: Sequelize.STRING,
    type: Sequelize.ENUM('page', 'post'),
    published: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  };

  return app.sequelize.define('Posts', Posts);
};