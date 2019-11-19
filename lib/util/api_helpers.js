
// API calls

const searchBooks = function (query) {
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
    });
};

const searchRestaurants = function (query) {
  const term = query.replace(' ', '+');

  navigator.geolocation.getCurrentPosition(function (position) {
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
        };
      });
  });

};

//ajax returns promise, use .then((media)=> {}) to grab media to manipulate
const getMovie = function(query) {
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
  for (let i = 0; i < query.length; i++) {
    if (query.charAt(i) === ' ') {
      queryParsed += '%20';
    } else {
      queryParsed += query.charAt(i);
    }
  }

  return $.ajax({
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${queryParsed}`

  }).then((options) => {
    let item = options.results[0];
    movieGenre = item.genre_ids[0];
    for (let genre of genres) {
      if (genre.id === movieGenre) {
        movieGenre = genre.name;
        break;
      }
    }
    media = {
      category_id: 2,
      title: item.title,
      description: item.overview,
      genre: movieGenre,
      img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`
    };
    return media;
  });
};

//pretty much identical code except for genres and for slight api url path. should we merge and add format to function so we only have 1 function for media?
const getTvShow = function(query) {
  let apiKey = '21db764af2f1a3095fa9ef7cc96fef08';
  let queryParsed = '';
  let genres = [
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

  for (let i = 0; i < query.length; i++) {
    if (query.charAt(i) === ' ') {
      queryParsed += '%20';
    } else {
      queryParsed += query.charAt(i);
    }
  }
};


module.exports = { searchBooks, searchRestaurants, getMovie, getTvShow };
