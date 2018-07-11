const Router = require('express').Router;

module.exports = (app) => {
  let router = new Router();

  router.get('/:slug?', app.actions.posts.read);
  router.post('/create', 
    app.middlewares.ensureAuth,
    app.middlewares.bodyParser({limit: '5mb'}),
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields(['title', 'summary', 'body', 'type']),
    app.actions.posts.create);
  router.put('/update/:slug',
    app.middlewares.ensureAuth,
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields(['title', 'summary', 'body']),
    app.actions.posts.update);
  router.delete('/delete/:slug',
    app.middlewares.ensureAuth,
    app.actions.posts.remove);

  return router;
};