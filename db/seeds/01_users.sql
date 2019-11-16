-- Users table seeds here (Example)
INSERT INTO users (full_name, email, phone, img, pw, signup_date, permissions)
VALUES ('Colin', 'colin@gmail.com', 789889123, 'url', 'asdfsadfsa', '04-11-2019', 'true'),
('Vanessa', 'Vanessa@gmail.com', 823943923, 'url2', 'poertujkdfg', '04-11-2019', 'true'),
('Michelle', 'Michelle@gmail.com', 093458034, 'url3', 'cvbuewrbmm', '04-11-2019', 'true')
;

INSERT INTO categories (name)
VALUES ('book'),
('media'),
('product'),
('restaurant');

-- id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(20) NOT NULL
