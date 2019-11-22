module.exports = (db) => {
  const register = function(user) {
    const createUser = `
    INSERT INTO users (full_name, email, pw, signup_date)
    VALUES ($1, $2, $3, now()::date)
    RETURNING *
    ;`;

    return db
    .query(createUser, [`${user.full_name}`, `${user.email}`, `${user.pw}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    });
  }

  const getItems = function(user) {
    const allItems =
    `
    SELECT
    to_do_user_specifics.user_id AS userid, todo_items.id AS todo_id, todo_items.category_id, to_do_user_specifics.id AS user_specific_item_id,
    to_do_user_specifics.position AS user_specified_position, to_do_user_specifics.archived,
    todo_items.title, todo_items.description, todo_items.url, todo_items.img,
    products.id AS product_id, products.brand, products.vendor, products.cost,
    books.id AS book_id, books.author, books.publication_date, books.page_length, books.genre AS books_genre,
    restaurants.id AS restaurant_id, restaurants.street_address, restaurants.city, restaurants.province_state, restaurants.country, restaurants.google_map_url,
    movies_tv.id AS movie_id, movies_tv.year, movies_tv.runtime, movies_tv.actors, movies_tv.genre AS movietv_genre,
    to_do_user_specifics.note, to_do_user_specifics.rate, to_do_user_specifics.rating_comment
  FROM todo_items
  JOIN to_do_user_specifics ON todo_items.id = to_do_user_specifics.todo_item_id
  LEFT OUTER JOIN movies_tv ON todo_items.id = movies_tv.todo_item_id
  LEFT OUTER JOIN restaurants ON todo_items.id = restaurants.todo_item_id
  LEFT OUTER JOIN products ON todo_items.id = products.todo_item_id
  LEFT OUTER JOIN books ON todo_items.id = books.todo_item_id
  WHERE to_do_user_specifics.archived = false
  AND to_do_user_specifics.user_id = $1
  ORDER BY userid
  ;`

    return db
    .query(allItems, [user])
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
    });
  };

  const getCompleted = function(user) {
    const completedItems =
    `SELECT
    to_do_user_specifics.user_id AS userid, todo_items.id AS todo_id, todo_items.category_id, to_do_user_specifics.id AS user_specific_item_id,
     to_do_user_specifics.position AS user_specified_position, to_do_user_specifics.archived,
     todo_items.title, todo_items.description, todo_items.url, todo_items.img,
     products.id AS product_id, products.brand, products.vendor, products.cost,
     books.id AS book_id, books.author, books.publication_date, books.page_length, books.genre AS books_genre,
     restaurants.id AS restaurant_id, restaurants.street_address, restaurants.city, restaurants.province_state, restaurants.country, restaurants.google_map_url,
     movies_tv.id AS movie_id, movies_tv.year, movies_tv.runtime, movies_tv.actors, movies_tv.genre AS movietv_genre,
     to_do_user_specifics.note, to_do_user_specifics.rate, to_do_user_specifics.rating_comment
  FROM todo_items
  JOIN to_do_user_specifics ON todo_items.id = to_do_user_specifics.todo_item_id
  LEFT OUTER JOIN movies_tv ON todo_items.id = movies_tv.todo_item_id
  LEFT OUTER JOIN restaurants ON todo_items.id = restaurants.todo_item_id
  LEFT OUTER JOIN products ON todo_items.id = products.todo_item_id
  LEFT OUTER JOIN books ON todo_items.id = books.todo_item_id
  WHERE to_do_user_specifics.archived = true
  AND to_do_user_specifics.user_id = $1
  ORDER BY userid
  ;`;

    return db
    .query(completedItems, [user])
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

  const addMovie = function(movie) {
    const newMovie = `
    WITH new_todo AS (
      INSERT INTO todo_items (category_id, title, description, url, img)
      SELECT $1, $2, $3, $4, $5
      WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4::varchar)
      RETURNING id
    )
    INSERT INTO movies_tv (todo_item_id, genre, year)
    SELECT (SELECT id FROM new_todo), $6, $7
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;
    return db
    .query(newMovie, [movie.category_id, `${movie.title}`, `${movie.description}`, `${movie.url}`, `${movie.img}`, `${movie.genre}`, movie.year])
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
    INSERT INTO movies_tv (todo_item_id, genre, year)
    SELECT (SELECT id FROM new_todo), $6, $7
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;
    return db
    .query(newTvShow, [tv.category_id, `${tv.title}`, `${tv.description}`, `${tv.url}`, `${tv.img}`, `${tv.genre}`, tv.year])
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
    SELECT (SELECT id FROM new_todo), $6, $7
    WHERE EXISTS (SELECT * FROM new_todo)
    ;`;

    console.log(product, "THIS IS INSIDE DB");

    return db
    .query(newProduct, [product.category_id, `${product.title}`, `${product.description}`, `${product.url}`, `${product.img}`, product.cost, `${product.brand}`])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
    })
  }

  const getUserId = function(email) {
    const userFromDatabase = `
    SELECT id
    FROM users
    WHERE email = $1;
    `;
    return db
    .query(userFromDatabase, [email])
    .then(res => res.rows[0])
    .catch((err) => console.log(err))
  };


  return { addBook, getItems, addRestaurant, archiveItem, getCompleted, unarchiveItem, register, getUserId, addProduct, addTvShow, addMovie };
};
