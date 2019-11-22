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
    helpers.getUserId(email)
    .then(id => req.session.user_id = id)
    .then (() => res.send('logged in'))
  });

  router.post('/', (req, res) => {
    const query = req.body.todo;
    const location = req.body.location;
    getAPIToDo(query, location, (search, b, item) => {
      addToDB(search, item, (search, err, remainingObj) => {
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
    .catch((err) => {throw err})
    });

   return router;

};
