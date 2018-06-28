const Sequelize = require('sequelize');

module.exports = (app) => {
  const Users = {
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: Sequelize.TEXT
    // FIXME: Define as mandatory
  };

  return app.sequelize.define('Users', Users);
};