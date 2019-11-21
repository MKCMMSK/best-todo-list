$(document).ready(function(){

  loadItems();

  $('li').click(function() {
    $(this).children('.collapsible-header').children('.arrow-icon').toggleClass("open");
  });

  // submit form with ajax
  $('#newToDo').submit((event) => {
    // event.preventDefault();
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


  // view todo/completed items
  $('#views')
  .formSelect()
  .change(function() {
    let view = '';
    $('#views option:selected').each(function() {
      view += $(this).text();
      if (view === 'To-do') {
        $('#read').text('To Read')
        $('#watch').text('To Watch')
        $('#eat').text('To Eat')
        $('#buy').text('To Buy')
        loadItems();
      } else if (view === 'Completed') {
        loadCompleted();
      }
    })
  })

});

//creates simple list item need to implement overload for different categories
function createListElement(object) {
  const top = `
    <li class="item" id=${object.user_specific_item_id}>
      <div class="collapsible-header">
        <div class="checkbox"><label><input type="checkbox"><span></span></label></div>

        ${object.title}
      </div>
      <div class="collapsible-body">
      <a href="${object.url}" target=_blank><img src="${object.img}"></a>
      <p>${object.description}</p>
      `;
  const bottom = `
      <p>Note: <span class="note">${object.note}</span></p>
      </div>
   </li>`;
  const wrapAround = [top, bottom];
  return wrapAround;
};


// create the book-specific elements of the listElement
const createBookSection = function(object, wrap) {
  const bookDetails = `
  <p>
  <span class="author">by ${object.author}</span> </br>
  <span class="genre">${object.books_genre}, </span>
  <span class="publication_date">published in ${object.publication_date} </span> </br>
  <span class="page_length">${object.page_length} pages</span>
  </p>
  `;
  const book = `${wrap[0]}${bookDetails}${wrap[1]}`;
  return book;
};

// create the tv/movie-specific elements of the listElement
const createMediaSection = function(object, wrap) {
  const mediaDetails = `
  <p>
  <span class="year">${object.year}</span> </br>
  <span class="genre">${object.movietv_genre}, </span>
  <span class="runtime">${object.runtime} minutes</span> </br>
  <span class="actors">Actors: ${object.actors}</span></br>
  <a href=${object.url} class="watch_now" target=_blank>Watch Now</a>
  </p>
  `;
  const media = `${wrap[0]}${mediaDetails}${wrap[1]}`
  return media;
};

// create the product-specific elements of the listElement
const createProductSection = function(object, wrap) {
  const productDetails = `
  <p>
  <span class="brand">${object.brand}</span></br>
  <span class="cost">${object.cost} at </span>
  <a href=${object.url} class="vendor" target=_blank>${object.vendor}</a>
  </p>
  `;
  const product = `${wrap[0]}${productDetails}${wrap[1]}`
  return product;
};

// create the restaurant-specific elements of the listElement
const createRestaurantSection = function(object, wrap) {
  const restaurantDetails = `
  <p>
  <span class="address">${object.street_address}<br>${object.city}, ${object.province_state} ${object.country}</span> </br>
  <a href=${object.google_map_url} class="get_directions" target=_blank>Get Directions</a>
  </p>
  `;
  const restaurant = `${wrap[0]}${restaurantDetails}${wrap[1]}`;
  return restaurant;
};

// create the restaurant-specific elements of the listElement
const createMiscSection = function(wrap) {
  let misc = `${wrap[0]}${wrap[1]}`;
  return misc;
};

// ajax request to archive item
const checkCompleted = function(event) {
  const todoId = $(this).parent().parent().parent().parent().attr('id')
  $.ajax({
    url: '/',
    method: 'PUT',
    data: { archiveId: todoId }
  })
  .then(setTimeout(() => { loadItems() }, 500))
};

// ajax request to unarchive item
const checkToDo = function(event) {
  const todoId = $(this).parent().parent().parent().parent().attr('id')
  $.ajax({
    url: '/completed',
    method: 'PUT',
    data: { archiveId: todoId }
  })
  .then(setTimeout(() => { loadCompleted(), 500}))
}

//prepends the database so that the top is the newest
const renderList = function(arr) {
  $('li.item').remove()
  for (let item of arr) {
    let wrapAround = createListElement(item);
    switch (item.category_id) {
      case 1:
        $(".to_read_list").prepend(createBookSection(item, wrapAround));
        break;
      case 2:
        $(".to_watch_list").prepend(createMediaSection(item, wrapAround));
        break;
      case 3:
        $(".to_eat_list").prepend(createProductSection(item, wrapAround));
        break;
      case 4:
        $(".to_buy_list").prepend(createRestaurantSection(item, wrapAround));
        break;
      case 5:
        $(".misc_list").prepend(createMiscSection(wrapAround));
    }
  }
}


const loadItems = function() {
  $.ajax({
    method: "GET",
    url: "/items"
  })
  .then((itemList) => {
    renderList(itemList);
  })
  .then(() => $('div.checkbox input').on('click', checkCompleted));
};

const loadCompleted = function() {
  $.ajax({
    method: 'GET',
    url: '/completed'
  })
  .then((itemList) => {
    renderList(itemList);
  })
  .then(() => {
    $('input[type=checkbox]').prop('checked', true)
    $('li.item').addClass('completed')
    $('#read').text('Read')
    $('#watch').text('Watched')
    $('#eat').text('Ate')
    $('#buy').text('Bought')
    $('div.checkbox input').on('click', checkToDo)
  })
}


const getPosition = function() {
  return new Promise (function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve(`${position.coords.latitude},${position.coords.longitude}`);
    });
  });
};
