const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.post('/upload', 
    // app.middlewares.ensureAuth,
    // app.middlewares.bodyParser.urlencoded(true),
    app.actions.media.upload);

  return router;
};