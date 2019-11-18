-- update item position based on user-specific-to-do-item id

UPDATE to_do_user_specifics
SET position = 3
WHERE to_do_user_specifics.id = 1
;
