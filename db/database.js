const addBook = function(book) {
  const newToDo = `
  INSERT INTO todo_items (category_id, title, description, url, img)
  SELECT $1, $2, $3, $4, $5
  WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4)
  ;`;
  const newBook = `
  INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
  VALUES ($1, $2, $3, $4, $5)
  ;`;

  return pool.query(newToDo, [book.category_id, `${book.title}`, `${book.description}`, `${book.url}`, `${book.img}`])
  .then(pool.query(newBook, [ID, `${book.author}`, `${book.publication_date}`, book.page_length, `${book.genre}`]))
  .then(res => res.rows)
  .catch();

}
