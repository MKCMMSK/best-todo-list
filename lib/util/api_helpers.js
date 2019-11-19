require('dotenv').config();
let request = require('request');
let mediaKey = process.env.mediaKey;
// API calls

const getBooks = function (query, callback) {
  const formatted = query.replace(' ', '+');
  request(`https://www.googleapis.com/books/v1/volumes?q=${formatted}`, function (err, res, body) {
    let parsedItem = JSON.parse(body).items[0];
  if (err || res.statusCode !== 200) {
      return callback(err || {statusCode: res.statusCode});
    }

    const book = {
      category_id: 1,
      title: parsedItem.volumeInfo.title,
      description: parsedItem.searchInfo.textSnippet,
      url: parsedItem.volumeInfo.infoLink,
      img: parsedItem.volumeInfo.imageLinks.smallThumbnail,
      author: parsedItem.volumeInfo.authors[0],
      publication_date: Number(parsedItem.volumeInfo.publishedDate.slice(0, 4)),
      page_length: parsedItem.volumeInfo.pageCount,
      genre: parsedItem.volumeInfo.categories[0]
    };

    callback(null, book);
  })

};

const getRestaurants = function (query,location, callback) { // have not refactored yet
  const term = query.replace(' ', '+');

  // navigator.geolocation.getCurrentPosition(function (position) {
  //   const location = `${position.coords.latitude},${position.coords.longitude}`;

    request(
      {
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
        // crossDomain: true,
        headers: {
          'Authorization': 'Bearer OF_s3CBJs9ncteh3m4vRN4PicqhnbmNjmJwgt9xkn-d2F2b3v4QZTH0HH22CQ2EmlWPAXjA2jfmOE6R9fZG-IASfcW0lzFC1YTwVt-Gh_L3lrDxwlOY7LvAh4OTSXXYx'
        }
      }, function (err, res, body) {
        if (err || res.statusCode !== 200) {
          return callback(err || {statusCode: res.statusCode});
        }
        const restaurant = {
          category_id: 4,
          title: body.businesses[0].name,
          description: body.businesses[0].categories[0].title,
          url: body.businesses[0].url,
          img: body.businesses[0].image_url,
          street_address: body.businesses[0].location.address1,
          city: body.businesses[0].location.city,
          province_state: body.businesses[0].location.state,
          country: body.businesses[0].location.country,
          google_map_url: `https://www.google.com/maps/dir/?api=1&origin=${location}&destination=${body.businesses[0].coordinates.latitude},${body.businesses[0].coordinates.longitude}`
        };
        callback(null, null, restaurant);
      });
};

//ajax returns promise, use .then((media)=> {}) to grab media to manipulate
const getMovie = function(query, callback) {
  let queryParsed = '';
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
  queryParsed = query.replace(' ', '%20');

  request(`https://api.themoviedb.org/3/search/movie?api_key=${mediaKey}&language=en-US&query=${queryParsed}`, function(err, res, body) {
    let item = JSON.parse(body).results[0];
    if (err || res.statusCode !== 200) {
      return callback(err || {statusCode: res.statusCode});
    }

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
      img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`,
      popularity: item.popularity

    }
    callback(null,media);
  });


};
//pretty much identical code except for genres and for slight api url path. should we merge and add format to function so we only have 1 function for media?
const getTvShow = function(query, callback) {
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
  let tvGenre
  queryParsed = query.replace(' ', '%20');
  request(`https://api.themoviedb.org/3/search/tv?api_key=${mediaKey}&language=en-US&query=${queryParsed}`, function(err, res, body) {
    let item = JSON.parse(body).results[0];
    if (err || res.statusCode !== 200) {
      return callback(err || {statusCode: res.statusCode});
    }

    tvGenre = item.genre_ids[0];
    for (let genre of genres) {
      if (genre.id === tvGenre) {
        tvGenre = genre.name;
        break;
      }
    }
    media = {
      category_id: 2,
      title: item.original_name,
      description: item.overview,
      genre: tvGenre,
      img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`,
      popularity: item.popularity

    }
    callback(null,media);
  });
};


module.exports = { getBooks, getRestaurants, getMovie, getTvShow }
