const Sequelize = require('sequelize');

module.exports = (app) => {

  // For ease of this tutorial, we are going to use SQLite to limit dependencies
  app.sequelize = new Sequelize({
    host: app.settings.database.host,
    database: app.settings.database.name,
    username: app.settings.database.user,
    password: app.settings.database.password,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: function() {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  app.models = {
    
  };

  app.sequelize
    .authenticate()
    .then(() => {
      console.log('[Server] Connection has been established successfully.');
    })
    .catch(err => {
      console.error('[Server] Unable to connect to the database:', err);
    });

  app.sequelize.sync({force: false});
};