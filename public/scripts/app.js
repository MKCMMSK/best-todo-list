// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function(){

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
    searchRestaurants(query);
  });

  // collapsible functionality for index
  $('.collapsible').collapsible();

});

const searchBooks = function(query) {
  const formatted = query.replace(' ', '+');
  $.ajax({
    url: `https://www.googleapis.com/books/v1/volumes?q=${formatted}`,
    method: 'GET'
  })
  .then((res) => {
    const book = {
      category_id: 1,
      title: res.items[0].volumeInfo.title,
      description: res.items[0].searchInfo.textSnippet,
      url: res.items[0].volumeInfo.infoLink,
      img: res.items[0].volumeInfo.imageLinks.smallThumbnail,
      author: res.items[0].volumeInfo.authors[0],
      publication_date: Number(res.items[0].volumeInfo.publishedDate.slice(0, 4)),
      length: res.items[0].volumeInfo.pageCount,
      genre: res.items[0].volumeInfo.categories[0]
    };
  })
};

const searchRestaurants = function(query) {
  const term = query.replace(' ', '+');

  navigator.geolocation.getCurrentPosition(function(position) {
    const location = `${position.coords.latitude},${position.coords.longitude}`;

    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
      method: 'GET',
      crossDomain: true,
      headers: {
        'Authorization': 'Bearer OF_s3CBJs9ncteh3m4vRN4PicqhnbmNjmJwgt9xkn-d2F2b3v4QZTH0HH22CQ2EmlWPAXjA2jfmOE6R9fZG-IASfcW0lzFC1YTwVt-Gh_L3lrDxwlOY7LvAh4OTSXXYx'
      }
    })
    .then((res) => {
      const restaurant = {
        category_id: 4,
        title: res.businesses[0].name,
        description: res.businesses[0].categories[0].title,
        url: res.businesses[0].url,
        img: res.businesses[0].image_url,
        street_address: res.businesses[0].location.address1,
        city: res.businesses[0].location.city,
        province_state: res.businesses[0].location.state,
        country: res.businesses[0].location.country,
        google_map_url: null
      }
      console.log(restaurant);
    })
  });

};


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
}
