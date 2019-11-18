-- update item  based on user-specific-to-do-item id

UPDATE preferences
SET pref_order = 2
WHERE user_id = 1
AND category_id = 1
;
