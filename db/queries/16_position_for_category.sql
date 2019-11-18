--  Select display position for a given category by user

SELECT position
FROM preferences
JOIN users ON users.id = preferences.user_id
WHERE users.id = 2
AND category_id = 2
;
