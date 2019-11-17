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
('restaurant'),
('misc');

INSERT INTO todo_items (category_id, title, description, url, img)
VALUES (4,'Blue water cafe', 'Seafood baby', 'BlueWater.com', 'BlueWater.com/pic'),
(1,'War and peace', 'fighting and no fighting', 'W&P.com', 'W&P.com/pic'),
(4,'noodle box', 'slurp slurp', 'noodles.com', 'noodles.com/pic'),
(5, 'ink cartridge', 'printer ink', 'stable.com', 'stable.com/printer/ink'),
(3, 'phone case', 'protection', 'case.com', 'case,con/pic'),
(4,'fallafal king', 'plates', 'king.com', 'king.com/pic'),
(1, 'lord of the rings: twin towers', 'fantasy book', 'lotr.com', 'lotr.com/pic'),
(5, 'paper clip', 'clip paper', 'stable.com', 'stable.com/clips'),
(2,'Game of Thrones', 'fighting and drama', 'GoT.com', 'GoT.com/pic'),
(3, 'nikes', 'bball shoes', 'nike.com', 'nike,con/pic'),
(1, 'lord of the rings: return of the king', 'fantasy book', 'lotr.com', 'lotr.com/pic'),
(2, 'avatar', 'last airbender?', 'avatar.com', 'avatars.com/pic'),
(5, 'chair', 'sit', 'chair.com', 'chair.com/pics'),
(3, 'vibergs', 'dope boots', 'viberg.com', 'viberg,con/pic'),
(4,'gojiro', 'another ramen', 'ramen2.com', 'ramen2.com/pic'),
(1, 'harry potter: order of the pheonix', 'magic book', 'hp.com', 'hp.com/pic'),
(3, 'jean jacket', 'fire', 'oni.com', 'oni,con/pic'),
(1, 'How not to be wrong with math', 'education book', 'math.com', 'math.com/pic'),
(2, 'stepbrothers', 'stepbrothers', 'stepbros.com', 'stepbros.com/pic'),
(2, 'facebook', 'get sued', 'fb.com', 'fb.com/pic'),
(5, 'printer', 'prints printed paper', 'stable.com', 'stable.com/printer'),
(5, 'paper', 'paper stack', 'stable.com', 'stable.com/paper'),
(3, 'soccer ball', 'greatest ball ever', 'ball.com', 'ball,con/pic'),
(2, 'space cowboys', 'pew pew', 'cowboy.com', 'cowboy.com/pic'),
(2, 'lighthouse', 'labs', 'll.com', 'll.com/pic'),
(4,'brooklyn pizzeria', 'bomb pies', 'pizza.com', 'pizza.com/pic'),
(1, 'Hitchhikers guide to the galaxy', 'Robert fucking spoils this book for me', 'hitch.com', 'hitch.com/pic' ),
(4,'matsurama', 'ramen', 'ramen.com', 'ramen.com/pic'),
(1, 'wifi', 'tech book', 'wifi.com', 'wifi.com/pic'),
(5, 'pen', 'writes on paper', 'stable.com', 'stable.com/pen'),
(3, 'yeezes', 'freshes shoes in the whole damn game', 'kanye.com', 'kanye,con/yeezy');

<<<<<<< HEAD
INSERT INTO preferences (user_id, category_id, pref_order, position)
=======

INSERT INTO preferences (user_id,cat_id, pref_order, position)
>>>>>>> origin/MShaoK/populateDB
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


INSERT INTO to_do_user_specifics (user_id, todo_item_id, note, archived, position, time_archived, rate, rating_comment)
VALUES (1, 3, 'cant wait to watch the terrible ending', 'false', '1', null, null, null),
(2, 1, 'amazing seafood I hear', 'false', '1', null, null, null),
(3, 2, 'amazing book I hear', 'true', '1', '2010-01-27', 5, 'GREAT BOOK');

INSERT INTO products (todo_item_id, brand, vendor, cost)
VALUES (4, 'yeezy', 'adidas', 200.50);

INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
VALUES (2, 'Leo Tolstoy, 1869, 1225, 'historic drama');

INSERT INTO movies_tv (todo_item_id, director, actors, genre)
VALUES (3, 'P', 'Kid Herrington????', 'fantasy drama');

INSERT INTO restaurants (todo_item_id, location, cuisine)
VALUES (1, 'Hamilton st. dt', 'Seafood');
-- item_id INTEGER REFERENCES todo_items(id),
--   location VARCHAR(75),
--   CUISINE VARCHAR(25)
