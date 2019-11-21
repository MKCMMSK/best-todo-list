module.exports = (db) => {
  const getItems = function(user) {
    const allItems =
    `SELECT * FROM todo_items
     JOIN to_do_user_specifics ON todo_items.id = todo_item_id
     WHERE user_id = ${user} AND NOT to_do_user_specifics.archived;`;

    return db
    .query(allItems)
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  };

  const getCompleted = function(user) {
    const allItems =
    `SELECT * FROM todo_items
     JOIN to_do_user_specifics ON todo_items.id = todo_item_id
     WHERE user_id = ${user} AND to_do_user_specifics.archived;`;

    return db
    .query(allItems)
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  };

  const archiveItem = function(user, todo) {
    const archive = `
    UPDATE to_do_user_specifics
    SET archived = true, date_archived = now()::date
    WHERE user_id = $1 AND id = $2
    ;`;

    return db
    .query(archive, [user, todo])
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  }

  const unarchiveItem = function(user, todo) {
    const archive = `
    UPDATE to_do_user_specifics
    SET archived = false
    WHERE user_id = $1 AND id = $2
    ;`;

    return db
    .query(archive, [user, todo])
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  }

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

  const addRestaurant = function(restaurant) {
    const newRestaurant = `
    WITH new_todo AS (
      INSERT INTO todo_items (category_id, title, description, url, img)
      SELECT $1, $2, $3, $4, $5
      WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4::varchar)
      RETURNING id
    )
    INSERT INTO restaurants (todo_item_id, street_address, city, province_state, country, google_map_url)
    SELECT (SELECT id FROM new_todo), $6, $7, $8, $9, $10
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;

    return db
    .query(newRestaurant, [restaurant.category_id, `${restaurant.title}`, `${restaurant.description}`, `${restaurant.url}`, `${restaurant.img}`, `${restaurant.street_address}`, `${restaurant.city}`, `${restaurant.province_state}`, `${restaurant.country}`, `${restaurant.google_map_url}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    })
  }

  return { addBook, getItems, addRestaurant, archiveItem, getCompleted, unarchiveItem };
};
