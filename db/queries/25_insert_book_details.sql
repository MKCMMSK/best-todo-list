-- insert new book details

WITH new_todo AS (
  INSERT INTO todo_items (category_id, title, description, url, img)
  SELECT (1, 'Cat in the Hat', 'description', 'url', 'img')
  WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = $4)
  RETURNING *;
)
INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
VALUES ((SELECT id FROM new_tood), 'Dr. Seuss', '1234', '123', 'Childrens book')
