module.exports = (app) => {
  app.helpers = {
    ensureOne,
    reject
  };

  function ensureOne(data) { return (data) ? data : Promise.reject(); }

  function reject(code, message) {
    return () => {
      return Promise.reject({
        code: code,
        message: message
      });
    };
  }
};