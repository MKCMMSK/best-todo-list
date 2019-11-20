
$(document).ready(function(){
  loadItems();

  // submit form with ajax
  $(function() {
    $('#newToDo').submit((event) => {
      const query = $('#compose').val();
      event.preventDefault();
      $.ajax({
        url: '/',
        method: 'POST',
        data: {todo: query}
      })
      .then(loadItems);
    });
  })

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
      <div class="collapsible-body">
      <a href=${object.url} target=_blank><img src=${object.img}></a>
      <p>${object.description}</p>
      </div>
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


const loadItems = function() {
  $.ajax({
    method: "GET",
    url: "/items"
  }).done((product) => {
    renderList(product);
  });
}
