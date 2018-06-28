const Router = require('express').Router;
module.exports = (app) => {
  const router = new Router();

  router.post('/login',
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields(['email', 'password']),
    app.actions.auth.login);
  return router;
};