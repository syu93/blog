const express = require('express');
const app = express();

module.exports = () => {
  require('./settings')(app); console.log("[server] Loading settings ...");
  require('./helpers')(app); console.log("[server] Loading helpers ...");
  require('./models')(app); console.log("[server] Loading models ...");
  require('./middlewares')(app); console.log("[server] Loading middlewares ...");
  require('./actions')(app); console.log("[server] Loading actions ...");
  require('./routes')(app); console.log("[server] Loading routes ...");

  return app;
};