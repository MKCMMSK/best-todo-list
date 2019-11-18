-- update item note based on user-specific-to-do-item id

UPDATE to_do_user_specifics
SET note = 'new user submitted note text'
WHERE to_do_user_specifics.id = 1
;
