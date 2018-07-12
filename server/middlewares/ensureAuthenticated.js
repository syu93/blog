const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const Users = app.models.Users;

  return (req, res, next) => {
    let authorization = req.headers['authorization'];

    if (!authorization)
      return unauthorized();

    return verifyToken()
      .then(findAssociatedUser)
      .then(app.helpers.ensureOne)
      .then(user => {req.userEmail = user.email;})
      .then(() => next())
      .catch(unauthorized);

    function verifyToken() {
      return new Promise((resolve, reject) => {
        jwt.verify(authorization,
          app.settings.security.salt,
          (err, decryptedToken) => {
            if (err) {
              return reject(err);
            }
            return resolve(decryptedToken);
          });
      })
    }

    async function findAssociatedUser(decryptedToken) {
      return await Users.findById(decryptedToken.data.userId);
    }

    function unauthorized(){
      return res.status(401).send('unauthorized');
    }
  };
};