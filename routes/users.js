/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (helpers) => {
  const { getAPIToDo, addToDB, changeCategory } = require('../lib/util/api_helpers')(helpers);
  router.get('/items', (req, res) => {
    let currentUser = null;
    if (req.session.user_id) {
      currentUser = req.session.user_id;
    };
    helpers.getItems(currentUser)
      .then((products) => {
        res.send(products)
      })
  });

  router.get("/users/:id", (req, res) => {
    const userID = req.params.id;
    // set session cookie
    req.session.user_id = userID;
    res.redirect('/');
  });

  router.post('/', (req, res) => {
    const query = req.body.todo;
    const location = req.body.location;

    getAPIToDo(query, location, (search, b, item) => {
      addToDB(search, item, (remainingObj) => {

        res.json(remainingObj);

      });
    })

  });

  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  });

  return router;
};





