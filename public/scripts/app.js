const { api_helpers } = require("../../lib/util/api_helpers.js");

$(document).ready(function () {

  $.ajax({
    method: "GET",
    url: "/items" //gets product in position 0 aka only item yeezy
  }).done((product) => {
    renderList(product);
  });

  // submit form with ajax
  $('#newToDo').submit((event) => {
    event.preventDefault();
    const query = $('#search').val();
    // searchBooks(query);
    api_helpers.searchRestaurants(query);
  });

  // collapsible functionality for index
  $('.collapsible').collapsible();

  api_helpers.getTvShow('Vikings').then((media) => { //media is the structured object we created
    console.log(media);
  });
});

const createListElement = function(object) { //creates simple list item need to implement overload for different categories
  let item = `
   <li>
      <div class="collapsible-header">${object.title}</div>
      <div class="collapsible-body">${object.description}</div>
   </li>`;

  return item;
};

const renderList = function(arr) { //prepends the database so that the top is the newest
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
