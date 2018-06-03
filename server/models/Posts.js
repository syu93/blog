const Sequelize = require('sequelize');

module.exports = (app) => {
  const Posts = {
    title: Sequelize.STRING,
    slug: {
      type: Sequelize.STRING,
      unique: true
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  };

  return app.sequelize.define('Sites', Sites);
};