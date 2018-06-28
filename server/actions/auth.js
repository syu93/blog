const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const Users = app.models.Users;

  return {
    login
  }

  function login(req, res, next) {
    return Users.findOne({where: {email: req.body.email, password: sha1(req.body.password)}})
      .then(app.helpers.ensureOne)
      .catch(app.helpers.reject(401, 'invalid.credentials'))
      .then(sign)
      .then(user => res.json(user))
      .catch(res.error);

      function sign(user) {
        return new Promise((resolve, reject) => {
          jwt.sign({
            data: {userId: user.id}
          }, app.settings.security.salt, {
            expiresIn: '1h'
          }, (err, encryptedToken) => {
            if (err)
              return reject(err);
            return resolve({user, token: encryptedToken});
          });
        });
      }
  }
};