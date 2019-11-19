/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT *
              FROM to_do_user_specifics
              WHERE user_id = 1
              ;`)
      .then(data => {
        const items = data.rows;
        res.json(items);
      });
  });

  router.post('/', (req, res) => {
    const query = req.body.todo;
    // api call, formats book in object
    // addbook sql, returning *
    //res.rows
    res.json(query);
  });

  return router;
};



