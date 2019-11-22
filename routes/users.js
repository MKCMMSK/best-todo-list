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
        console.log(products);
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
  router.post(('/login'), (req, res) => {
    const email = req.body.email;
    const userID = helpers.getUserId(email);
    console.log(req.body);
    if (userID) {
      req.session.user_id = userID;
      console.log("session cookie set to user id", req.session.user_id);
      res.send('logged in');
    };
  });
  router.post('/', (req, res) => {
    const query = req.body.todo;
    const location = req.body.location;
    getAPIToDo(query, location, (search, b, item) => {
      addToDB(search, item, (search, err, remainingObj) => {
        console.log("THIS IS A TEST");
        console.log(remainingObj);
        res.json(remainingObj);
      });
    });

  });


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
  })
  return router;
};





