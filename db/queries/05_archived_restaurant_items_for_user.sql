--  All category-independent data for archived user restaurant to-do items

SELECT *
FROM users
JOIN to_do_user_specifics ON users.id = user_id
JOIN todo_items ON todo_items.id = to_do_user_specifics.todo_item_id
JOIN restaurants ON todo_items.id = restaurants.todo_item_id
WHERE users.id = 1
AND archived = true;
