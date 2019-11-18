-- insert new todo-item if the item url
-- doesn't already exist in todo_items

INSERT INTO todo_items (category_id, title, description, url, img)
  SELECT 2, 'new item', 'newdescription', 'newurl', 'newimg'
  WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = 'http://www.noodleb')
;
