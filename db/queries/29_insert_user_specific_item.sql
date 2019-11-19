-- insert new todo-item if the item url
-- doesn't already exist in todo_items

INSERT INTO to_do_user_specifics (user_id, todo_item_id, note, archived, position, date_archived, rate, rating_comment)
VALUES (1, 1, 'note', false, 3, null, null, null)
;
