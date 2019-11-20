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
    console.log(parsedItem);
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
      genre: parsedItem.volumeInfo.categories[0],
    };

    callback(null, book);
  })

};

const getRestaurant = function (query, location, callback) { // have not refactored yet
  const parsedQuery = query.replace(' ', '+');

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
      year: item.release_date.slice(0,4)

    }
    callback(null,media);
  });


};
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
      year: item.first_air_date.slice(0,4)
    }
    callback(null,media);
  });
};

function getProduct (query, callback) {
  let parsedQuery = `categories:${query}`;
  request({
    url: 'https://api.datafiniti.co/v4/products/search',
    method: 'POST',
    json: {
      'query': parsedQuery,
      'format': 'JSON',
      'num_records': 1,
      'download': false
    },
    headers: {
      'Authorization': dataKey,
      'Content-Type': 'application/json'
    }},
    function(err, res, body) {
      if (err || res.statusCode !== 200) {
        return callback(err || {statusCode: res.statusCode});
    }
      let productObj = body.records[0];
      const product = {
        title: productObj.name,
        description: productObj.descriptions[0].value,
        img: productObj.imageURLs[0],
        cost: productObj.prices[0].amountMin,
        url: productObj.sourceURLs[0]
      }
      if (productObj.brand) {
        product.brand = productObj.brand;
      }
      callback(null, product);
    });
}



module.exports = { getBook, getRestaurant, getMovie, getTvShow, getProduct }
