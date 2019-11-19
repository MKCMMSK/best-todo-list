/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */


// submit form with jquery
$('#newToDo').submit((event) => {
  event.preventDefault();
  const query = $('#search').val();
  // searchBooks(query);
  api_helpers.searchRestaurants(query);
});


const createListElement = function (object) { //creates simple list item need to implement overload for different categories
  let item = `
   <li>
      <div class="collapsible-header">${object.title}</div>
      <div class="collapsible-body">${object.description}</div>
   </li>`;

  return item;
};

const renderList = function (arr) { //prepends the database so that the top is the newest
  for (let item of arr) {
    switch (item.cat_id) {
      case 1:
        $(".to_read_list").prepend(createListElement(item));
        break;
      case 2:
        $(".to_watch_list").prepend(createListElement(item));
        break;
      case 3:
        $(".to_buy_list").prepend(createListElement(item));
        break;
      case 4:
        $(".to_eat_list").prepend(createListElement(item));
        break;
      case 5:
        $(".misc_list").prepend(createListElement(item));
    }
  }
};
