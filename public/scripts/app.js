$(document).ready(function () {

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
