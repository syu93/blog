module.exports = (app) => {

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", app.settings.allowedOrigins);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  // Blog API
  app.use('/api/posts', require('./posts')(app));
  app.use('/api/auth', require('./auth')(app));
  app.use('/api/media', require('./media')(app));

  // Blog routes
  app.use('/', require('./app')(app));
};