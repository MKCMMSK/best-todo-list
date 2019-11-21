module.exports = (db) => {
  const getItems = function(user) {
    const allItems =
    `SELECT *
    FROM todo_items
    JOIN to_do_user_specifics ON todo_items.id = todo_item_id
    LEFT OUTER JOIN movies_tv ON todo_items.id = movies_tv.todo_item_id
    LEFT OUTER JOIN restaurants ON todo_items.id = restaurants.todo_item_id
    LEFT OUTER JOIN products ON todo_items.id = products.todo_item_id
    LEFT OUTER JOIN books ON todo_items.id = books.todo_item_id
    WHERE user_id = ${user}`;

    return db
    .query(allItems)
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  };
  const checkItem(query) {

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

  const addMovie = function(movie) {
    const newMovie = `
    WITH new_todo AS (
      INSERT INTO todo_items (category_id, title, description, url, img)
      SELECT $1, $2, $3, $4, $5
      WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4::varchar)
      RETURNING id
    )
    INSERT INTO movies_tv (todo_item_id, movietv_genre, year)
    SELECT (SELECT id FROM new_todo), $6, $7, $8
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;
    return db
    .query(newMovie, [movie.category_id, `${movie.title}`, `${movie.description}`, `${movie.url}`, `${movie.img}`, `${movie.movietv_genre}`, `${movie.year}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    })
  }

  const addTvShow = function(tv) {
    const newTvShow = `
    WITH new_todo AS (
      INSERT INTO todo_items (category_id, title, description, url, img)
      SELECT $1, $2, $3, $4, $5
      WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4::varchar)
      RETURNING id
    )
    INSERT INTO movies_tv (todo_item_id, movietv_genre, year)
    SELECT (SELECT id FROM new_todo), $6, $7, $8
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;
    return db
    .query(newTvShow, [tv.category_id, `${tv.title}`, `${tv.description}`, `${tv.url}`, `${tv.img}`, `${tv.movietv_genre}`, `${tv.year}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    })
  }

  const addProduct = function(product) {
    const newProduct = `
    WITH new_todo AS (
      INSERT INTO todo_items (category_id, title, description, url, img)
      SELECT $1, $2, $3, $4, $5
      WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4::varchar)
      RETURNING id
    )
    INSERT INTO products (todo_item_id, cost, brand)
    SELECT (SELECT id FROM new_todo), $6, $7, $8
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;
    return db
    .query(newProduct, [product.category_id, `${product.title}`, `${product.description}`, `${product.url}`, `${product.img}`, `${product.cost}`, `${product.brand}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    })
  }

  return { addBook, getItems, addRestaurant, addMovie, addTvShow, addProduct };
};
