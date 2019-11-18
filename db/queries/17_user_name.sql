--  Select full name of user by id or email

SELECT full_name
FROM users
WHERE users.id = 1
OR email = 'colin@gmail.com'
;
