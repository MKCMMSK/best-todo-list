SELECT
  to_do_user_specifics.user_id AS userid, todo_items.id AS todo_id, todo_items.category_id, to_do_user_specifics.id AS user_specific_item_id,
   to_do_user_specifics.position AS user_specified_position, to_do_user_specifics.archived,
   todo_items.title, todo_items.description, todo_items.url, todo_items.img,
   products.id AS product_id, products.brand, products.vendor, products.cost,
   books.id AS book_id, books.author, books.publication_date, books.page_length, books.genre AS books_genre,
   restaurants.id AS restaurant_id, restaurants.street_address, restaurants.city, restaurants.province_state, restaurants.country, restaurants.google_map_url,
   movies_tv.id AS movie_id, movies_tv.year, movies_tv.runtime, movies_tv.actors, movies_tv.genre AS movietv_genre,
   to_do_user_specifics.note, to_do_user_specifics.rate, to_do_user_specifics.rating_comment
FROM todo_items
JOIN to_do_user_specifics ON todo_items.id = to_do_user_specifics.todo_item_id
LEFT OUTER JOIN movies_tv ON todo_items.id = movies_tv.todo_item_id
LEFT OUTER JOIN restaurants ON todo_items.id = restaurants.todo_item_id
LEFT OUTER JOIN products ON todo_items.id = products.todo_item_id
LEFT OUTER JOIN books ON todo_items.id = books.todo_item_id
WHERE to_do_user_specifics.archived = 'false'
ORDER BY userid
;
