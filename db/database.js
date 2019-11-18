const addBook = function(book) {
  const newToDo = `
  INSERT INTO todo_items (category_id, title, description, url, img)
  SELECT 2, 'new item', 'newdescription', 'newurl', 'newimg'
  WHERE NOT EXISTS (SELECT * FROM todo_items WHERE url = 'http://www.noodleb')
  ;`;
  const newBook = `
  INSERT INTO books (todo_item_id, author, publication_date, page_length, genre)
  VALUES ($1, $2, $3, $4, $5)
  ;`;
}
