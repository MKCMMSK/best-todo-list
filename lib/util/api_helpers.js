require('dotenv').config();
let request = require('request');
let mediaKey = process.env.mediaKey;
let yelpKey = process.env.yelpKey;
let dataKey = process.env.datafinitiKey;
// API calls

const getBook = function (query, callback) {
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

const getRestaurant = function (query,location, callback) { // have not refactored yet
  const parsedQuery = query.replace(' ', '+');

  // navigator.geolocation.getCurrentPosition(function (position) {
  //   const location = `${position.coords.latitude},${position.coords.longitude}`;

    request(
      {
        url: `https://api.yelp.com/v3/businesses/search?location=${location}&term=${parsedQuery}`,
        crossDomain: true,
        headers: {
          'Authorization': yelpKey
        }
      }, function (err, res, body) {
        if (err || res.statusCode !== 200) {
          return callback(err || {statusCode: res.statusCode});
        }
        let restaurantObj = JSON.parse(body);
        const restaurant = {
          category_id: 4,
          title: restaurantObj.businesses[0].name,
          description: restaurantObj.businesses[0].categories[0].title,
          url: restaurantObj.businesses[0].url,
          img: restaurantObj.businesses[0].image_url,
          street_address: restaurantObj.businesses[0].location.address1,
          city: restaurantObj.businesses[0].location.city,
          province_state: restaurantObj.businesses[0].location.state,
          country: restaurantObj.businesses[0].location.country,
          google_map_url: `https://www.google.com/maps/dir/?api=1&origin=${location}&destination=${restaurantObj.businesses[0].coordinates.latitude},${restaurantObj.businesses[0].coordinates.longitude}`
        };
        callback(null, null, restaurant);
      });
};

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

function getProduct (query, callback) {
  request({
    url: 'https://api.datafiniti.co/v4/products/search',
    method: 'POST',
    json: {
      'query': query,
      'format': format,
      'num_records': num_records,
      'download': download
    },
    headers: {
      'Authorization': datafinitiKey,
      'Content-Type': 'application/json'
    }},
    function(err, res, body) {
      if (err || res.statusCode !== 200) {
        return callback(err || {statusCode: res.statusCode});
    }
    console.log(body);
    });
}



module.exports = { getBook, getRestaurant, getMovie, getTvShow, getProduct }






// "brand": "Kuteck",
// "categories": [
//    "Cases Protectors",
//    "Cellphone Accessories",
//    "Cell Phone Cases",
//    "Cell Phones"
// ],
// "descriptions": [

//    {
//       "value": "Leather-like flip case wallet with three card holders.Business attire collection an opening behind the front cover to store money, receipts, etc, Media Stand Feature: Built-in stand for horizontal media view. Cover folds back into a viewing stand.Precise cutouts for complete access to all ports, buttons, cameras, speakers, and mics.",
//       "sourceURLs": [
//          "https://www.walmart.com/ip/1B6KV27Q6DC6"
//       ],
//    }
// ],

// "imageURLs": [
//    "https://i5.walmartimages.com/asr/3a6af581-73bb-4e01-b84b-6b693158c178_1.4dfab627b0a4e5c2bfe02dc00ef844c7.jpeg",
// ],,
// "name": "Samsung Galaxy A3 Leather Wallet Pouch Case Cover Red",
// "prices": [
//    {
//       "amountMax": 10,
//       "amountMin": 10,
//       "availability": "true",
//       "currency": "USD",
//       "dateSeen": [
//          "2019-05-01T07:29:00.000Z"
//       ],
//       "offer": "Online only",
//    },
//    {
//       "amountMax": 10,
//       "amountMin": 10,
//       "availability": "true",
//       "color": "Red",
//       "currency": "USD",
//       "dateSeen": [
//          "2019-11-19T22:56:00.000Z"
//       ],
//    }
// ],
// "sourceURLs": [
//    "https://www.walmart.com/ip/Samsung-Galaxy-A3-Leather-Wallet-Pouch-Case-Cover-Red/101253303",
//    "https://www.walmart.com/ip/1B6KV27Q6DC6"
// ],
// "upc": [
//    "638632206868"
// ],

// }
