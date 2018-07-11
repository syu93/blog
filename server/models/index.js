const Sequelize = require('sequelize');
const sha1 = require('sha1');

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
    Posts: require('./Posts.js')(app),
    Users: require('./Users.js')(app),
  };

  app.sequelize
    .authenticate()
    .then(() => {
      app.models.Posts.belongsTo(app.models.Users, {foreignKey: 'user_id', as: 'Authors'});
      app.models.Users.hasMany(app.models.Posts, {foreignKey: 'user_id', as: 'Authors'});
    })
    .then(() => {
      console.log('[Server] Connection has been established successfully.');
      app.sequelize.sync({force: app.settings.database.sync}).then(() => {
        app.models.Users.findOrCreate({where: {email: "test@gmail.com"}, defaults: {name: "Syu93", email: "test@gmail.com", password: sha1(app.settings.security.password)}});
      });
    })
    .catch(err => {
      console.error('[Server] Unable to connect to the database:', err);
    });
};