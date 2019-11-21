$(document).ready(function(){

  loadItems();

  $('li').click(function() {
    $(this).children('.collapsible-header').children('.arrow-icon').toggleClass("open");
  });

  // submit form with ajax
  $('#newToDo').submit((event) => {
    event.preventDefault();
    const query = $('#compose').val();
    getPosition()
    .then((latlong) => {
      return $.ajax({
        url: '/',
        method: 'POST',
        data: {
          todo: query,
          location: latlong
        }
      })
    })
    .then(loadItems);
  });

  // submit logout with ajax
  $(function () {
    $('.logout').submit((event) => {
      $.ajax({
        method: "POST",
        url: "/logout",
      });
    });
  });

  // collapsible functionality for index
  $('.collapsible').collapsible();


  // view completed items
  // li class selected
  $('#views')
  .formSelect()
  .change(function() {
    let view = '';
    $('#views option:selected').each(function() {
      view += $(this).text();
      if (view === 'To-do') {
        alert('To-do items');
      } else if (view === 'Completed') {
        alert('completed items');
      }
    })
  })

  // $.ajax({
  //   method: 'GET',
  //   url: '/completed'
  // })


});

function createListElement(object) { //creates simple list item need to implement overload for different categories
  let item = `
    <li class="item" id=${object.id}>
      <div class="collapsible-header">

        <div class="checkbox"><label><input type="checkbox"><span ></span></label></div>

        ${object.title}
      </div>
      <div class="collapsible-body">
      <a href="${object.url}" target=_blank><img src="${object.img}"></a>
      <p>${object.description}</p>
      </div>
   </li>`;

  return item;
}

function checkboxClickHandler(event) {
  event.stopPropagation();
  // ajax request to archive item
  const todoId = $(this).parent().parent().parent().parent().attr('id')
  $.ajax({
    url: '/',
    method: 'PUT',
    data: { archiveId: todoId }
  })
  .then(setTimeout(() => { loadItems() }, 500))
}

function renderList(arr) { //prepends the database so that the top is the newest
  $('li.item').remove()
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
  $('div.checkbox input').on('click', checkboxClickHandler);
}


const loadItems = function () {
  $.ajax({
    method: "GET",
    url: "/items"
  })
  .done((itemList) => {
    renderList(itemList);
  });
};

const getPosition = function() {
  return new Promise (function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve(`${position.coords.latitude},${position.coords.longitude}`);
    });
  });
};
