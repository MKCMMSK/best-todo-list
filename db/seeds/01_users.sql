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

INSERT INTO todo_items (cat_id,title, description, url, img)
VALUES (4,'Blue water cafe', 'Seafood baby', 'BlueWater.com', 'BlueWater.com/pic'),
(1,'War and peace', 'fighting and no fighting', 'W&P.com', 'W&P.com/pic'),
(2,'Game of Thrones', 'fighting and drama', 'GoT.com', 'GoT.com/pic');

INSERT INTO preferences (user_id,cat_id, pref_order, position)
VALUES (1, 1, 4,4), /* colin preferences */
(1, 2, 3,3),
(1, 3, 2,2),
(1, 4, 1,1),
(2, 1, 2,2), /* Vanessa preferences */
(2, 2, 1,1),
(2, 3, 4,4),
(2, 4, 3,3),
(3, 1, 2,2),/* Michelle preferences */
(3, 2, 3,3),
(3, 3, 1,1),
(3, 4, 4,4)
;
--  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   cat_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
--   pref_order INTEGER NOT NULL,
--   position INTEGER
