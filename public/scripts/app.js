
$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/items" //gets product in position 0 aka only item yeezy
  }).done((product) => {
    console.log(product);
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

  getTvShow('Vikings').then((media) => { //media is the structured object we created
    console.log(media);
  });
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
        google_map_url: `https://www.google.com/maps/dir/?api=1&origin=${location}&destination=${res.businesses[0].coordinates.latitude},${res.businesses[0].coordinates.longitude}`
      }
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

function getProduct (query) {
  let API_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlc3JucjJ3Mjd0YXNhMXd5Nm5iaGRwMjZkYnhpZDBzZiIsImlzcyI6ImRhdGFmaW5pdGkuY28ifQ.sHCtoqLdEWCXnFKCshSzd2UjrSFNHftAMTpZ20KXYgcAixWTZd-djGatj-rgxNtx0izMC4wIRm1-ZJKpI2e7M_xrVKuQGMepz3NYCzQVB9DIm_axsxYjbxNeLDfNZudOSjvBxEIN3d3Y9evjK9TG0ILzTNN_oDEWUys-5VWnVB08CJNgf436l8UScDe7dkySl5xRk2Mt58bdCFakPJfiMCqM4x4zD23XTeKu50tAkS7pXBWpBebp6vET_w9CJqqY7sLtvfACachnDHFt4ljLCS8kDDP0k7FsSmAfd4gnp-qa9fmA_2Cg_yobQxlarvr6beJ6jlzqN-n9PfsMLQLrZtdlr5RAqbSWAYwwZLqiSGJnu4tPQCw0HNK9LW_jIcJJh_uHocshsVh9xsHHFrGQucROWVsMjiwNE2KULZtkay35nr-sg_syMMOq4loHA8viPwDOlJ-Nwksa-h5VIIULKCoz-HDUs3T2z1jZbdCMuas4wtveo8t5tDvTYJmpDKdbCfdGvs4RoHZ_hsPEkuWmyR5SaFsVCPWk1t4ziL6Ews_OoDvVhumCGp1SCrSIUY-zFsrmJ6iw0fZuGmrB1Auwjb6UJOBjepuAs0Y0UtK6LIsabGLwvT7Y9sMbRXMshykI-Ek0n__m2QiLw6G-pxoRxcaLTEDtGdaH1c_vwpcnTQ8';
  return $.ajax({
    method: 'POST',
    url: 'https://api.datafiniti.co/v4/products/search',
    data: JSON.stringify({
      'query': query,
      'format': 'JSON',
      'num_records': 1,
      'download': false
    }),
    headers: {
      'Authorization': 'Bearer ' + API_token,
      'Content-Type': 'application/json'
    }
  }).then((product) => {
    return product;
  })
}
