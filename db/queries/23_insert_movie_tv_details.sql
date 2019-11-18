-- insert new movie/tv details

INSERT INTO movies_tv (todo_item_id, director, year, runtime, actors, genre)
VALUES ($1, $2, $3, $4, $5, $6)
;
