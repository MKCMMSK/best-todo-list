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
(2,'Game of Thrones', 'fighting and drama', 'GoT.com', 'GoT.com/pic'),
(3, 'yeezes', 'freshes shoes in the whole damn game', 'kanye.com', 'kanye,con/yeezy');

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


INSERT INTO to_do_user_specifics (user_id, item_id, note, archived, position, time_archived, rate, rating_comment)
VALUES (1, 3, 'cant wait to watch the terrible ending', 'false', '1', null, null, null),
(2, 1, 'amazing seafood I hear', 'false', '1', null, null, null),
(3, 2, 'amazing book I hear', 'true', '1', '2010-01-27', 5, 'GREAT BOOK');

INSERT INTO products (item_id, brand, vendor, cost)
VALUES (4, 'yeezy', 'adidas', 200.50);

INSERT INTO books (item_id, author, length, genre)
VALUES (2, 'writer of war and peace', 600, 'historic drama');

INSERT INTO movies_tv (item_id, director, actors, genre)
VALUES (3, 'P', 'Kid Herrington????', 'fantasy drama');

INSERT INTO restaurants (item_id, location, cuisine)
VALUES (1, 'Hamilton st. dt', 'Seafood');
-- item_id INTEGER REFERENCES todo_items(id),
--   location VARCHAR(75),
--   CUISINE VARCHAR(25)
