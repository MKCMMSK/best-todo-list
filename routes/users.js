/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getBooks, getRestaurants, getMovie, getTvShow } = require('../lib/util/api_helpers');

module.exports = (helpers) => {
  // router.get("/", (req, res) => {
  //   db.query(`SELECT *
  //             FROM todo_items
  //             ;`)
  //     .then(data => {
  //       const items = data.rows;
  //       res.json(items);
  //     });
  // });

  router.post('/', (req, res) => {
    const query = req.body.todo;
    getBooks(query, (err, book) => {
      helpers.addBook(book);
    });
    res.json(query);
  });

  return router;
};



