const express = require('express');
const app = express();

module.exports = () => {
  require('./settings')(app); console.log("[server] Loading settings ...");
  require('./models')(app); console.log("[server] Loading models ...");

  return app;
};