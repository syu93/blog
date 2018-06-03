const path = require('path');
const fs = require('fs');

module.exports = (app) => {
  const env = process.env.NODE_ENV || 'dev';
  const config = '../config/config-' + env + '.json';

  app.settings = require(path.join(__dirname, config));
};