-- delete item from user's todo items

DELETE FROM to_do_user_specifics
WHERE user_id = 1
AND to_do_user_specifics.id = 1
;
