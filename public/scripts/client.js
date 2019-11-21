$(document).ready(function(){

  loadItems();

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


});

// create the book-specific elements of the listElement
const createBookSection = function(object) {
  const bookDetails = `
  <p>
  Author: <span class="author">${object.author}</span> </br>
  <span class="publication_date">Published: ${object.publication_date} </span> </br>
  <span class="genre">${object.books_genre}, </span>
  <span class="page_length">${object.page_length} pages</span>
  </p>
  `;
  return bookDetails;
};

// create the tv/movie-specific elements of the listElement
const createMediaSection = function(object) {
  const mediaDetails = `
  <p>
  <span class="year">${object.year}</span> </br>
  <span class="genre">${object.movietv_genre}, </span>
  <span class="runtime">${object.runtime} minutes</span> </br>
  <span class="director">Director: ${object.director}</span> </br>
  <span class="actors">Actors: ${object.actors}</span>
  </p>
  `;
  return mediaDetails;
};

// create the product-specific elements of the listElement
const createProductSection = function(object) {
  const productDetails = `
  <p>
  <span class="brand">${object.brand}</span></br>
  <span class="cost">${object.cost} at </span>
  <a href=${object.url} class="vendor" target=_blank>${object.vendor}</a>
  </p>
  `;
  return productDetails;

};

// create the restaurant-specific elements of the listElement
const createRestaurantSection = function(object) {
  const restaurantDetails = `
  <p>
  <span class="address">${object.street_address}<br>${object.city}, ${object.province_state} ${object.country}</span> </br>
  <a href=${object.google_map_url} class="get_directions" target=_blank>Get Directions</a>
  </p>
  `;

  return restaurantDetails;
};

function createListElement(object) { //creates simple list item need to implement overload for different categories
  let item = `
   <li>
      <div class="collapsible-header">${object.title}</div>
      <div class="collapsible-body">
      <a href=${object.url} target=_blank><img src=${object.img}></a>
      <p>${object.description}</p>
      `
  switch (object.category_id) {
    case 1:
      item += createBookSection(object);
      break;
    case 2:
      item += createMediaSection(object);
      break;
    case 3:
      item += createProductSection(object);
      break;
    case 4:
      item += createRestaurantSection(object);
      break;
  };

  item += `
      <p>Note: <span class="note">${object.note}</span></p>
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


const loadItems = function () {
  $.ajax({
    method: "GET",
    url: "/items"
  }).done((product) => {
    renderList(product);
  });
};

const getPosition = function() {
  return new Promise (function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve(`${position.coords.latitude},${position.coords.longitude}`);
    });
  });
};
