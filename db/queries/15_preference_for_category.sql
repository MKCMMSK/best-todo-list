--  Select preference order for a given category by user

SELECT pref_order
FROM preferences
JOIN users ON users.id = preferences.user_id
WHERE users.id = 2
AND category_id = 2
;
