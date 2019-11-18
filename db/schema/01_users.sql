-- Drop and recreate Users TABLE (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS todo_items CASCADE;
DROP TABLE IF EXISTS preferences CASCADE;
DROP TABLE IF EXISTS to_do_user_specifics CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS movies_tv CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  full_name VARCHAR (255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone INTEGER,
  img VARCHAR(500),
  pw VARCHAR(75) NOT NULL,
  signup_date DATE NOT NULL,
  permissions BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE todo_items (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(140) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  img VARCHAR(500)
);

CREATE TABLE preferences (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  pref_order INTEGER NOT NULL,
  position INTEGER
);


CREATE TABLE to_do_user_specifics (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  todo_item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  note VARCHAR(1000),
  archived BOOLEAN NOT NULL DEFAULT false,
  position INTEGER NOT NULL,
  date_archived DATE,
  rate INTEGER,
  rating_comment VARCHAR(1000)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  todo_item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  brand VARCHAR(50),
  vendor VARCHAR(50),
  cost MONEY NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  todo_item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  author VARCHAR(50),
  publication_date INTEGER,
  page_length SMALLINT,
  genre VARCHAR(50)
);

CREATE TABLE movies_tv (
  id SERIAL PRIMARY KEY NOT NULL,
  todo_item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  director VARCHAR(50),
  year SMALLINT,
  runtime SMALLINT,
  actors VARCHAR(255),
  genre VARCHAR(50)
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  todo_item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  street_address VARCHAR(255),
  city VARCHAR(255),
  province_state VARCHAR(255),
  country VARCHAR(255),
  google_map_url VARCHAR(255)
);
