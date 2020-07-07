const knex = require("../database");

module.exports = {

  async index(req, res, next) {
    try {
      const { users_id, page = 1 } = req.query;
      const query = knex('projects')
        .limit(5).offset((page - 1) * 5);

      const countObj = knex('projects').count();

      if (users_id) {
        query.where({ users_id })
          .join('users', 'users.id', '=', 'projects.users_id')
          .select('projects.*', 'users.username');

        countObj.where({ user_id });
      }

      const [count] = await countObj;

      res.header('X-Total-Count', count["count"]);

      const results = await query;

      return res.json(results);

    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {

      const { title, users_id } = req.body;
      await knex('projects').insert({ title, users_id });
      return res.status(201).send();

    } catch (error) {
      next(error);
    }
  },



}