require('dotenv').config();
let request = require('request');
// let mediaKey = process.env.mediaKey;
// let yelpKey = process.env.yelpKey;
let dataKey = process.env.datafinitiKey;
// let classifyUser = process.env.uClassifyUser;
// let classifierName = process.env.classifierName;
// let classifyKey = process.env.classifyKey;
let mediaKey ='21db764af2f1a3095fa9ef7cc96fef08'
let yelpKey ='Bearer OF_s3CBJs9ncteh3m4vRN4PicqhnbmNjmJwgt9xkn-d2F2b3v4QZTH0HH22CQ2EmlWPAXjA2jfmOE6R9fZG-IASfcW0lzFC1YTwVt-Gh_L3lrDxwlOY7LvAh4OTSXXYx'
let classifyUser = "MShaoK"
let classifierName = "SmartToDo"
let classifyKey = 'Token XPpD0Bb60NKX'
// API calls
module.exports = (helpers) => {

const getBook = function(search, callback) {
  const parsedSearch = search.replace(' ', '+');
  request(`https://www.googleapis.com/books/v1/volumes?q=${parsedSearch}`, function(err, res, body) {
    let parsedItem = JSON.parse(body).items[0];
    if (err || res.statusCode !== 200) {
      return callback(err || {statusCode: res.statusCode});
    }
    const book = {
      category_id: 1,
      title: parsedItem.volumeInfo.title,
      url: parsedItem.volumeInfo.infoLink,
      description: parsedItem.searchInfo.textSnippet,
      img: parsedItem.volumeInfo.imageLinks.smallThumbnail,
      author: parsedItem.volumeInfo.authors[0],
      publication_date: Number(parsedItem.volumeInfo.publishedDate.slice(0, 4)),
      page_length: parsedItem.volumeInfo.pageCount,
      book_genre: parsedItem.volumeInfo.categories[0],
    };
    // if (parsedItem.searchInfo.textSnippet) {
    // } else {
    //   book.description = parsedItem.description;
    // }
    callback(null, book);
  });

};

const getRestaurant = function(search, location, callback) { // have not refactored yet
  const parsedSearch = search.replace(' ', '+');

  request(
    {
      url: `https://api.yelp.com/v3/businesses/search?location=${location}&term=${parsedSearch}`,
      crossDomain: true,
      headers: {
        'Authorization': yelpKey
      }
    }, function(err, res, body) {
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

const getMovie = function(search, callback) {
  let parsedSearch = '';
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
  parsedSearch = search.replace(' ', '%20');

  request(`https://api.themoviedb.org/3/search/movie?api_key=${mediaKey}&language=en-US&query=${parsedSearch}`, function(err, res, body) {
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
    let media = {
      category_id: 2,
      title: item.title,
      description: item.overview,
      movietv_genre: movieGenre,
      img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`,
      year: item.release_date.slice(0,4)

    };
    callback(null,media);
  });


};

const getTvShow = function(search, callback) {
  let parsedSearch = '';
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
  let tvGenre;
  parsedSearch = search.replace(' ', '%20');
  request(`https://api.themoviedb.org/3/search/tv?api_key=${mediaKey}&language=en-US&query=${parsedSearch}`, function(err, res, body) {
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
    let media = {
      category_id: 2,
      title: item.original_name,
      description: item.overview,
      movietv_genre: tvGenre,
      img: `https://image.tmdb.org/t/p/w154/${item.poster_path}`,
      year: item.first_air_date.slice(0,4)
    };
    callback(null,media);
  });
};

function getProduct(search, callback) {
  let parsedSearch = `categories:${search}`;
  request({
    url: 'https://api.datafiniti.co/v4/products/search',
    method: 'POST',
    json: {
      'query': parsedSearch,
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
      category_id: 3,
      title: productObj.name,
      description: productObj.descriptions[0].value,
      img: productObj.imageURLs[0],
      cost: productObj.prices[0].amountMin,
      url: productObj.sourceURLs[0]
    };
    if (productObj.brand) {
      product.brand = productObj.brand;
    }
    callback(null, product);
  });
}

function getProbability(search, callback) {
  request({
    url: `https://api.uclassify.com/v1/${classifyUser}/${classifierName}/classify`,
    method: 'POST',
    JSON: true,

    form: `{\"texts\":[\"${search}\"]}`,
    headers:{
      'Authorization':classifyKey,
      'Content-Type': 'application/json'
    },
  },
  function(err,res, body) {
    let book = JSON.parse(body)[0].classification[0].p;
    let movie = JSON.parse(body)[0].classification[1].p;
    let tv = JSON.parse(body)[0].classification[4].p;
    let product = JSON.parse(body)[0].classification[2].p;
    let restaurant = JSON.parse(body)[0].classification[3].p;
    let probability = {book, movie, product, restaurant, tv};
    let apiToUse = book;

    for (let api in probability) {
      if (probability[api] > apiToUse) {
        apiToUse = probability[api];
      }
    }
    apiToUse = getKeyByValue(probability, apiToUse);

    callback(null, apiToUse);
  });
}
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getAPIToDo(search, location, callback) {
  let toDoObj = {};

  getBook(search, (err, book)=> {
    toDoObj["book"] = book;

    getMovie(search, (err, movie)=> {
      toDoObj.movie = movie;

      getTvShow(search, (err, tv)=> {
        toDoObj.tv = tv;

        getProduct(search, (err, product)=> {
          toDoObj.Product = product;

          getRestaurant(search, location, (err, res,restaurant)=> {
            toDoObj.restaurant = restaurant;
            callback(search, null, toDoObj);
          });
        });
      });
    });
  });

}

function addToDB(search,objObj) {
  getProbability(search, (err, api)=>{
    switch (api) {
      case "book":
        console.log(objObj.book, "this is the book");
        helpers.addBook(objObj.book);
        delete objObj.book;
        break;
      case "movie":
        helpers.addMovie(objObj.movie);
        delete objObj.movie;
        break;
      case "tv":
        helpers.addTvShow(objObj.tv);
        delete objObj.tv;
        break;
      case "product":
        helpers.addProduct(objObj.product);
        delete objObj.product;
        break;
      case "restaurant":
        helpers.addRestaurant(objObj.restaurant);
        delete objObj.restaurant;
    }
  });
  return objObj;
}


return {getAPIToDo, addToDB, getBook};
}
