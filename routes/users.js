/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getBook, getRestaurants, getMovie, getTvShow } = require('../lib/util/api_helpers');

module.exports = (helpers) => {
  router.get('/items', (req, res) => {
    let currentUser = null;
    if (req.session.user_id) {
      currentUser = req.session.user_id;
    };
    //console.log(`current user: ${currentUser}`);
    helpers.getItems(currentUser)
      .then((products) => {
        res.send(products)
      })
  });

  router.get("/:id", (req, res) => {
    const userID = req.params.id;
    // set session cookie
    req.session.user_id = userID;
    res.redirect('/');
  });

  router.post('/', (req, res) => {
    const query = req.body.todo;
    getBook(query, (err, book) => {
      helpers.addBook(book)
        .then(() => { res.json(query) });
    })
  });

  return router;
};



