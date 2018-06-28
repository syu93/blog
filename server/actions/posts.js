module.exports = (app) => {
  const Posts = app.models.Posts;
  const Users = app.models.Users;

  return {
    create,
    read,
    update,
    remove
  };

  /**
   * Async mode is more convenient
   * as we need to associate two models
   * Create a new post assiciated with a user
   *
   * @param      {<type>}    req     The request
   * @param      {<type>}    res     The resource
   * @param      {Function}  next    The next
   * @return     {Promise}   { description_of_the_return_value }
   */
  async function create(req, res, next) {
    try {
      if (!req.userEmail) throw 'Error, no user found';
      const user = await Users.findOne({where: {email: req.userEmail}})
      const post = await Posts.create({
        title: req.body.title,
        slug: req.body.slug,
        summary: req.body.summary,
        body: req.body.body,
        type: req.body.type || 'post',
        published: req.body.published || 0,
        user_id: user.id
      })
      return res.json(post);
    } catch(err) {
      res.error(err);
    }
  }

  /**
   * @brief       Get one or multiple post 
   * @param       req   { parameter_description }
   * @param       res   { parameter_description }
   * @param       next  { parameter_description }
   * @return      { description_of_the_return_value } */
  function read(req, res, next) {
    // If an ID is submited
    if (!req.params.slug)
      return Posts.findAll({
        where: {published: 1},
        include: [{model: Users, as: "Authors", attributes: {exclude: ['token', 'password']}}]
      }).then(data => {
        res.json(data);
      }).catch(req.error);
    // Else return all documents
    return Posts.findOne({where: {slug: req.params.slug, published: 1}, include: [{model: Users, as: "Authors", attributes: {exclude: ['token', 'password']}}]})
      .then(app.helpers.ensureOne)
      .catch(app.helpers.reject(404, "No post found for this URL"))
      .then(sites => {
        res.json(sites)
    }).catch(res.error);
  }

  /**
   * @brief       Update one post
   * @param       req   { parameter_description }
   * @param       res   { parameter_description }
   * @param       next  { parameter_description }
   * @return      { description_of_the_return_value } */
  function update(req, res, next) {
    Posts.findOne({where: {slug: req.params.slug}})
      .then(app.helpers.ensureOne)
      .catch(app.helpers.reject(404, "No post found for this slug"))
      .then(post => {
        return post.update({
          title: req.body.title,
          slug: req.body.slug,
          summary: req.body.summary,
          body: req.body.body,
          published: req.body.published || 0,
        });
      })
      .then(post => {
        res.json(post);
      }).catch(res.error);
  }

  /**
   * @brief       Delete one post
   * @param       req   { parameter_description }
   * @param       res   { parameter_description }
   * @param       next  { parameter_description }
   * @return      { description_of_the_return_value } */
  function remove(req, res, next) {
    Posts.findOne({where: {slug: req.params.slug}})
      .then(app.helpers.ensureOne)
      .catch(app.helpers.reject(404, "No post found for this slug"))
      .then(post => {
        return post.destroy({force: true});
      }).then(() => {
        res.json({success: true});
      }).catch(res.error);
  }

};