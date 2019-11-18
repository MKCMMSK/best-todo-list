-- insert new restaurant details

INSERT INTO restaurants (todo_item_id, street_address, city, province_state, country, google_map_url)
VALUES ($1, $2, $3, $4, $5, $6)
;
