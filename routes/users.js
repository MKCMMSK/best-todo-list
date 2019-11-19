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
              FROM todo_items
              ;`)
      .then(data => {
        const items = data.rows;
        res.json(items);
      });
  });

  router.post('/', (req, res) => {
    // api call, formats book in object
    // addbook
    res.send('server received');
  });

  return router;
};



