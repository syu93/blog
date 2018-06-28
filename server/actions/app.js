const path = require('path');

module.exports = (app) => {
  return {
    app,
  };

  function app(req, res, next) {
    return res.sendFile(path.resolve(__dirname, '../../index.html'));
  }
};