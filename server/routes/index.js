module.exports = (app) => {
  // Blog API
  app.use('/api/posts', require('./posts')(app));
  app.use('/api/auth', require('./auth')(app));

  // Blog routes
  app.use('/', require('./app')(app));
};