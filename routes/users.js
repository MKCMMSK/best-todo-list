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
      .catch((err) => {
        console.error(`get /items err = ${err}`)
      });
  });

  router.put('/', (req, res) => {
    const userId = req.session.user_id;
    const todo = req.body.archiveId;
    if (!todo) {
      res.send('400');
    }
    helpers.archiveItem(userId, todo)
    .then(() => { res.send('deleted') })
    .catch((err) => {
      console.error(`put / err @ archiveItem = ${err}`)
    });
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
      .catch((err) => {
        console.error(`get /completed @ getCompleted = ${err}`)
      });
  });

  router.put('/completed', (req, res) => {
    const userId = req.session.user_id;
    const todo = req.body.archiveId;
    if (!todo) {
      res.send('400');
    }
    helpers.unarchiveItem(userId, todo)
      .then(() => { res.send('moved to to-do') })
      .catch((err) => {
        console.error(`put /completed err @ unarchiveItem = ${err}`)
      });
  });

  router.post(('/login'), (req, res) => {
    const email = req.body.email;
    //const userID;
    helpers.getUserId(email)
    //.then((id) => id)
    .then(id => req.session.user_id = id)
    .then (() => res.send('logged in'))
    //console.log(`POST /login userID: ${userID}`)
    //console.log(`post /login req.body.email: ${req.body.email}`);
    // if (userID) {
    //   req.session.user_id = userID;
    //   console.log("session cookie set to user id", req.session.user_id);

    });

  router.post('/', (req, res) => {
    const query = req.body.todo;
    const location = req.body.location;
    getBook(query, (err, book) => {
      helpers.addBook(book)
        .then(() => { res.json(query) })
        .catch((err) => {
          console.error(`post / err @ addBook = ${err}`)
        });
    });

    getAPIToDo(query, location, (a, b, response) => {
      console.log(`getAPIToDo response ${response}`);
      res.send(response);
    });
  });

    // getRestaurant(query, location, (a, b, restaurant) => {
    //   helpers.addRestaurant(restaurant)
    //   .then(() => { res.json(query) });
    // })

  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  });

  router.post('/register', (req, res) => {
    let userId = null;
    const user = req.body;
    helpers.register(user)
    .then((user) => userId = helpers.getUserId(user.email))
    .then((userId) => req.session.user_id = userId)
    .then(() => res.send('created'))
    .catch((err) => {
      console.error(`post /register err @ register = ${err}`)
    });
  });
   return router;
};
