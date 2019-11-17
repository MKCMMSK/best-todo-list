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
  full_name VARCHAR (50) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone INTEGER,
  img TEXT,
  pw VARCHAR(25) NOT NULL,
  signup_date DATE NOT NULL,
  permissions BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE todo_items (
  id SERIAL PRIMARY KEY NOT NULL,
  cat_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(20) NOT NULL,
  description TEXT,
  url TEXT,
  img TEXT
);

CREATE TABLE preferences (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  cat_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  pref_order INTEGER NOT NULL,
  position INTEGER
);


CREATE TABLE to_do_user_specifics (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  note text,
  archived boolean NOT NULL DEFAULT false,
  position INTEGER NOT NULL,
  time_archived date,
  rate INTEGER,
  rating_comment text
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  brand VARCHAR(50),
  vendor VARCHAR(50),
  cost money NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES todo_items(id) ON DELETE CASCADE,
  author VARCHAR(50),
  length INTEGER,
  genre VARCHAR(50)
);

CREATE TABLE movies_tv (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES todo_items(id),
  director VARCHAR(50),
  length time,
  actors text,
  genre VARCHAR(50)
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES todo_items(id),
  location VARCHAR(75),
  CUISINE VARCHAR(50)
);
