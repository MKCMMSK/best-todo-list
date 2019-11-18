-- insert new user

INSERT INTO users (full_name, email, phone, img, pw, signup_date, permissions)
VALUES ($1, $2, $3, $4, $5, $6, $7)
;
