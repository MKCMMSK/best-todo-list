-- insert new book details

WITH new_todo AS (
  INSERT INTO todo_items (category_id, title, description, url, img)
  SELECT 1, 'Cat in the Hat3', 'description', 'www.cathat3.com', 'img'
  WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = 'www.cathat3.com')
  RETURNING id
)
INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
SELECT (SELECT id FROM new_todo), 'Dr. Seuss', '1234', '123', 'Childrens book'
WHERE EXISTS (SELECT * FROM new_todo)

INSERT INTO to_do_user_specifics (todo_item_id)
SELECT (SELECT id FROM new_todo)
WHERE EXISTS (SELECT * FROM new_todo);
