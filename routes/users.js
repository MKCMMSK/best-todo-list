/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

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
    const obj = {
      category_id: 1,
      title: 'harry potter',
      description: 'desc',
      url: 'url',
      img: 'image',
      author: 'jk rowling',
      publication_date: 1111,
      page_length: 11,
      genre: 'genre'
    }
    helpers.addBook(obj);
    res.json(query);
  });

  return router;
};



