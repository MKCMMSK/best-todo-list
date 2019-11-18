-- insert new book details

INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
VALUES ($1, $2, $3, $4, $5)
;
