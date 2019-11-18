--  Return first 3 records in a user's current list of todo items
-- (archived and active) that match a user's search for a new item
-- to add to their list

SELECT *
FROM users
JOIN to_do_user_specifics ON users.id = user_id
JOIN todo_items ON todo_items.id = to_do_user_specifics.todo_item_id
WHERE users.id = 1
AND todo_items.title ILIKE '%search text here%'
LIMIT 3;
