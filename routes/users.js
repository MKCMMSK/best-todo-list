/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getAPIToDo } = require('../lib/util/api_helpers');
const { addBook, getItems, addRestaurant, archiveItem } = require('../routes/helpers');

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

  router.put('/', (req, res) => {
    const userId = req.session.user_id;
    const todo = req.body.archiveId;
    if (!todo) {
      res.send('400');
    }
    helpers.archiveItem(userId, todo)
    .then(() => { res.send('deleted') })
  });

  router.get('/completed', (req, res) => {
    let currentUser = null;
    if (req.session.user_id) {
      currentUser = req.session.user_id;
    }
    helpers.getCompleted(currentUser)
      .then((products) => {
        res.send(products)
      })
  });

  router.put('/completed', (req, res) => {
    const userId = req.session.user_id;
    const todo = req.body.archiveId;
    if (!todo) {
      res.send('400');
    }
    helpers.unarchiveItem(userId, todo)
      .then(() => { res.send('moved to to-do') })
  });


  router.get("/users/:id", (req, res) => {

    const userID = req.params.id;
    // set session cookie
    req.session.user_id = userID;
    console.log("just set s.user_id in /:id to", req.session.user_id);
    res.redirect('/');
  });


  router.post('/', (req, res) => {
    const query = req.body.todo;
    const location = req.body.location;
    getBook(query, (err, book) => {
      helpers.addBook(book)
        .then(() => { res.json(query) });
    })

    getAPIToDo(query, location, (a, b, response) => {
      console.log(response);
      res.send(response);
    })

    // getRestaurant(query, location, (a, b, restaurant) => {
    //   helpers.addRestaurant(restaurant)
    //   .then(() => { res.json(query) });
    // })
  });

  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  });

  return router;
};





