
$(document).ready(function(){


  $.ajax({
    method: "GET",
    url: "/items" //gets product in position 0 aka only item yeezy
  }).done((product) => {
    renderList(product);
  });

  // submit form with ajax
  $('#newToDo').submit((event) => {
    const query = $('#compose').val();
    event.preventDefault();
    $.ajax({
      url: '/items',
      method: 'POST',
      data: {todo: query},
      success: function(res) {
        console.log(res);
      }
    })
    // .then(console.log(query));
  });

  // collapsible functionality for index
  $('.collapsible').collapsible();

  getMovie('Vikings').then((media) => { //media is the structured object we created
    console.log(media);
  });
});

function createListElement(object) { //creates simple list item need to implement overload for different categories
  let item = `
   <li>
      <div class="collapsible-header">${object.title}</div>
      <div class="collapsible-body">${object.description}</div>
   </li>`;

  return item;
}

function renderList(arr) { //prepends the database so that the top is the newest
  for (let item of arr) {
    switch (item.category_id) {
      case 1:
        $(".to_read_list").prepend(createListElement(item));
        break;
      case 2:
        $(".to_watch_list").prepend(createListElement(item));
        break;
      case 3:
        $(".to_eat_list").prepend(createListElement(item));
        break;
      case 4:
        $(".to_buy_list").prepend(createListElement(item));
        break;
      case 5:
        $(".misc_list").prepend(createListElement(item));
    }
  }
}


