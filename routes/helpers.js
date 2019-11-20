module.exports = (db) => {
  const getItems = function() {
    const allItems =
    `
    SELECT * FROM todo_items
    ;`;

    return db
    .query(allItems)
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  };

  const addBook = function(book) {
    const newBook = `
    WITH new_todo AS (
      INSERT INTO todo_items (category_id, title, description, url, img)
      SELECT $1, $2, $3, $4, $5
      WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4::varchar)
      RETURNING id
    )
    INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
    SELECT (SELECT id FROM new_todo), $6, $7, $8, $9
    WHERE EXISTS (SELECT * FROM new_todo)

    ;`;

    return db
    .query(newBook, [book.category_id, `${book.title}`, `${book.description}`, `${book.url}`, `${book.img}`, `${book.author}`, `${book.publication_date}`, book.page_length, `${book.genre}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    });

  }

  return { addBook, getItems };
};
