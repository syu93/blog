module.exports = (app) => {
  app.actions = {
    app: require('./app')(app),
    posts: require('./posts')(app),
    auth: require('./auth')(app),
  }
};