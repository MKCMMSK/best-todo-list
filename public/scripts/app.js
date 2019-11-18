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
  });

  // collapsible functionality for index
  $('.collapsible').collapsible();

  getTvShow('Vikings').then((media) => { //media is the structured object we created
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

function createToEatElement(object) { //creates simple list item need to implement overload for different categories
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

function getMovie(query) { //ajax returns promise, use .then((media)=> {}) to grab media to manipulate
  let apiKey = '21db764af2f1a3095fa9ef7cc96fef08';
  let queryParsed = '';
  let media;
  let genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
  let movieGenre = '';
  for (let i = 0; i <  query.length; i++) {
    if (query.charAt(i) === ' '){
      queryParsed += '%20';
    } else {
      queryParsed += query.charAt(i);
    }
  }

  return $.ajax({
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${queryParsed}`

  }).then((options)=> {
    let item = options.results[0];
    movieGenre = item.genre_ids[0];
    for (let genre of genres) {
      if (genre.id === movieGenre) {
        movieGenre = genre.name;
        break;
      }
    }
      media = {
        category_id:2,
        title: item.title,
        description: item.overview,
        genre: movieGenre,
        img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`
       }
     return media;
  });
}

function getTvShow(query) { //pretty much identical code except for genres and for slight api url path. should we merge and add format to function so we only have 1 function for media?
  let apiKey = '21db764af2f1a3095fa9ef7cc96fef08';
  let queryParsed = '';
  let genres= [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

  for (let i = 0; i <  query.length; i++) {
    if (query.charAt(i) === ' '){
      queryParsed += '%20';
    } else {
      queryParsed += query.charAt(i);
    }
  }

  return $.ajax({
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${queryParsed}`

  }).then((options)=> {
    let item = options.results[0];
    movieGenre = item.genre_ids[0];
    for (let genre of genres) {
      if (genre.id === movieGenre) {
        movieGenre = genre.name;
        break;
      }
    }
    media = {
      category_id:2,
      title: item.original_name,
      description: item.overview,
      genre: movieGenre,
      img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`
     }
   return media;
  });
}

// Map for ToEat lists, need a way to enter new entrys of lat and lng
/* <div id="map"></div>
<script>
  var map;
  function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: -34.397, lng: 150.644},
  zoom: 8
  });
  }
  </script>
 <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCz8KPGUWJzzmBPHXerTA9nDTS5ptGoQc&callback=initMap"
  type="text/javascript"></script> */

  // <!-- PLACES API -->

  //  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCz8KPGUWJzzmBPHXerTA9nDTS5ptGoQc&libraries=places"></script>

  //   <!-- GOOGLE MAP API-->
  // <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCz8KPGUWJzzmBPHXerTA9nDTS5ptGoQc&callback=initMap"
  //     type="text/javascript"></script>

  // <style>
  //   #map {
  //   width: 500px;
  //   height: 500px;
  //    }
  // </style>
