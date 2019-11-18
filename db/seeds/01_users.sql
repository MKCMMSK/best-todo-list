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
VALUES (4,'Blue water cafe', 'Seafood restaurant', 'https://www.bluewatercafe.net/', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/5d/84/22/blue-water-cafe-dining.jpg'),
(4,'noodle box', 'Southeast Asian street food', 'http://www.noodlebox.ca/', 'https://images.squarespace-cdn.com/content/v1/573a10b34d088e2c9c1f932b/1465235422918-MVB0U88590GSO87D377G/ke17ZwdGBToddI8pDm48kFYH3uwMjP6R5AB4BbCPevB7gQa3H78H3Y0txjaiv_0f0RFAW16tgzDazO3NMD7c9sJ5_-acVIg1HRnHHMpKbMhwky-cxhVd6UQAcW2ca9mfeoqS5JAWrnb1436X_b_yVWxU0godxi02JM9uVemPLqyo4MZgSQAiIfMAFDQitfnlaaqqIPmPQuv4sK2Brh-aEw/NBX_BLACK_BEAN_GARLIC-1_crop.jpg?format=2500w'),
(1,'War and peace', 'fighting and no fighting', 'https://books.google.ca/books/about/War_and_Peace.html?id=s-OQ2yHDIMQC&redir_esc=y', 'https://books.google.ca/books/content?id=5lpoAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70bYKGUz9gnbgP9ScqU4jWoFRRVovISjiSmnm65oY8UzirVXKYbc49LqSugQaJ1Le4I7p7lP-42UnORkuRfD5-W0g_QqaisvVtcU7cMUsRWMh8IyFRpwe4LogCOnHo0rMDxvakp'),
(1, 'lord of the rings: twin towers', 'fantasy book', 'https://books.google.ca/books?id=_FjrugAACAAJ&dq=lord+of+the+rings+two+towers&hl=en&sa=X&ved=0ahUKEwi6h5ufgPLlAhWXrZ4KHR_BAwQQ6AEINzAC', 'https://books.google.ca/books/content?id=_FjrugAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72F5Wd3dc7M7dY936jZWoHkSo0tg6yjDGnEsz36spYSxC46jhT332R5_eq1ZQcQL0YaEGG935_JX94zQ_ilphkz_hVNqdvXyzCxEouARregM25N8Ma_bTyXtf9eySwseb3Mjoeh'),
(3, 'ink cartridge', 'printer ink', 'https://www.staples.ca/products/1017452-en-epson-252xl-black-ink-cartridge-high-capacity-t252xl120', 'https://cdn.shopify.com/s/files/1/0036/4806/1509/products/s0831495_7bf79037-2ee6-4b50-9128-180bdf828a60_1000x1000@2x.jpg?v=1573725220'),
(3, 'OtterBox Symmetry Otter + Pop Fitted Hard Shell Case', 'Enjoy protection, convenience, and style with the OtterBox Symmetry Otter + Pop case. Its slim and sleek design defends your iPhone against damage while', 'https://www.bestbuy.ca/en-ca/product/otterbox-symmetry-otter-pop-fitted-hard-shell-case-for-iphone-7-8-mauveolous/13418946', 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/134/13418/13418946.jpg'),
(4,'fallafal king', 'plates', 'https://www.tripadvisor.ca/Restaurant_Review-g154943-d4851751-Reviews-Falafel_King_Restaurant-Vancouver_British_Columbia.html', 'https://media-cdn.tripadvisor.com/media/photo-o/17/1a/f1/2d/falafel-salad-plate.jpg'),
(3, 'paper clip', 'clip paper', 'https://www.staples.ca/products/13688-en-staples-jumbo-paper-clips-non-skid-10-x-100pack', 'https://cdn.shopify.com/s/files/1/0036/4806/1509/products/s0340219_d24248ba-5149-42d3-ba62-f213f10bb059_1000x1000@2x.jpg?v=1573120635'),
(2,'Game of Thrones', 'fighting and drama', 'https://www.crave.ca/en/search?q=game%20of%20thrones#/series/37696', 'https://images2.9c9media.com/image_asset/2019_4_3_970d1b72-dc86-4755-bd9e-d55a7de678fc_png_2000x1125.jpg'),
(3, 'Nike Mens Air Vapormax', 'Color: Club Gold/Light Cream, Leather/Mesh, Leather sole', 'https://www.amazon.com/Nike-AR6631-701-Match-Supreme/dp/B00MFY4IB6/ref=sr_1_4?dchild=1&keywords=vapormax&qid=1574029090&sr=8-4', 'https://images-na.ssl-images-amazon.com/images/I/71LI%2B-MO4UL._AC_UX695_.jpg'),
(1, 'lord of the rings: return of the king', 'fantasy book', 'lotr.com', 'lotr.com/pic'),
(2, 'avatar', 'last airbender?', 'https://www.imdb.com/title/tt0499549/', 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_UX182_CR0,0,182,268_AL_.jpg'),
(1, 'Infinite Jest', 'A gargantuan, mind-altering comedy about the pursuit of happiness in America.', 'https://www.amazon.ca/Infinite-Jest-David-Foster-Wallace/dp/0316066524', 'https://images-na.ssl-images-amazon.com/images/I/41EHZhquMoL._SX321_BO1,204,203,200_.jpg'),
(5, 'Seawall run', null, null, null),
(5, 'Kayaking', null, null, null),
(3, 'vibergs', 'dope boots', 'viberg.com', 'viberg,con/pic'),
(4,'gojiro', 'another ramen', 'ramen2.com', 'ramen2.com/pic'),
(1, 'harry potter: order of the pheonix', 'magic book', 'hp.com', 'hp.com/pic'),
(3, 'jean jacket', 'fire', 'oni.com', 'oni,con/pic'),
(1, 'How not to be wrong with math', 'education book', 'math.com', 'math.com/pic'),
(2, 'stepbrothers', 'stepbrothers', 'stepbros.com', 'stepbros.com/pic'),
(2, 'facebook', 'get sued', 'fb.com', 'fb.com/pic'),
(3, 'soccer ball', 'greatest ball ever', 'ball.com', 'ball,con/pic'),
(2, 'space cowboys', 'pew pew', 'cowboy.com', 'cowboy.com/pic'),
(2, 'lighthouse', 'labs', 'll.com', 'll.com/pic'),
(4,'brooklyn pizzeria', 'bomb pies', 'pizza.com', 'pizza.com/pic'),
(1, 'Hitchhikers guide to the galaxy', 'Robert fucking spoils this book for me', 'hitch.com', 'hitch.com/pic' ),
(4,'matsurama', 'ramen', 'ramen.com', 'ramen.com/pic'),
(1, 'wifi', 'tech book', 'wifi.com', 'wifi.com/pic'),
(3, 'yeezes', 'freshes shoes in the whole damn game', 'kanye.com', 'kanye,con/yeezy');

INSERT INTO preferences (user_id, category_id, pref_order, position)
VALUES (1, 1, 4,3), /* colin preferences */
(1, 2, 3, 4),
(1, 3, 2,2),
(1, 4, 1,1),
(2, 1, 2,1), /* Vanessa preferences */
(2, 2, 1,2),
(2, 3, 4,4),
(2, 4, 3,3),
(3, 1, 2,2),/* Michelle preferences */
(3, 2, 3,3),
(3, 3, 1,1),
(3, 4, 4,4)
;


INSERT INTO to_do_user_specifics (user_id, todo_item_id, note, archived, position, date_archived, rate, rating_comment)
VALUES (1, 9, 'cant wait to watch the terrible ending', 'false', 1, null, null, null),
(1, 12, 'favorite movie of all time', 'true', 1, '2018-12-28', 5, 'watch this again asap'),

(1, 13, 'read when I have a week off', 'false', 1, null, null, null),
(1, 3, 'recommended by georgafina', 'true', 1, '2018-10-23', 4, 'the movie was better'),

(1, 10, 'need these', 'false', 1, null, null, null),
(1, 6, 'for new phone', 'true', 1, '2019-07-13', 3, 'works'),

(1, 1, 'amazing seafood I hear', 'false', 1, null, null, null),
(1, 2, 'quick lunch for school days', 'true', 1, '2019-10-14', 4, 'long wait time from 12-2pm'),

(1, 14, 'New Years Resolution: every Sunday this year!', 'false', 1, null, null, null),
(1, 15, 'lessons in Deep Cove', 'true', 1, '2019-05-02', 4, 'lesson was great, weather was gross'),

(2, 1, 'amazing seafood I hear', 'false', 1, null, null, null),
(3, 2, 'amazing book I hear', 'true', 1, '2010-01-27', 5, 'GREAT BOOK');

INSERT INTO products (todo_item_id, brand, vendor, cost)
VALUES (10, 'Nike', 'Amazon', 109.99),
(6, 'Otterbox', 'Best Buy', 64.99);

INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
VALUES (3, 'Leo Tolstoy', 1869, 1225, 'Historic Drama'),
(13, 'David Foster Wallace', 2006, 1104, 'Hysterical Realism');

INSERT INTO movies_tv (todo_item_id, director, year, runtime, actors, genre)
VALUES (9, 'Alan Taylor', 2011, 57, 'Emilia Clarke, Peter Dinklage, Kit Harrington', 'fantasy drama'),
(12, 'James Camero', 2009, 162, 'Sam Worthington, Zoe Saldana', 'fantasy');

INSERT INTO restaurants (todo_item_id, street_address, city, province_state, country, google_map_url)
VALUES (1, 'Blue Water Cafe', 'Vancouver', 'BC', 'Canada', 'https://goo.gl/maps/FMbDEfj7uAAaYrhG8'),
(2, '108 W Hastings St', 'Vancouver', 'BC', 'Canada', 'https://goo.gl/maps/q6CwqpMqgMdGPtiz9');

