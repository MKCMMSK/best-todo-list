-- select todo item if url already in db for user

SELECT *
FROM todo_items
JOIN to_do_user_specifics ON todo_items.id = todo_item_id
WHERE url = 'http://www.noodlebox.ca/'
AND user_id = 1
;
