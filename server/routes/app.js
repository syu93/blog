const express = require('express');
const Router = express.Router;

module.exports = (app) => {
  let router = new Router();


  // FIXME : Get build path from config
  app.use('/src', express.static(__dirname + '/../../src'));
  app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
  app.use('/images', express.static(__dirname + '/../../images'));

  router.get('*', app.actions.app.app);
  return router;
};