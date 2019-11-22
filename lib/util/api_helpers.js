require('dotenv').config();
let request = require('request');
let mediaKey = process.env.mediaKey;
let yelpKey = process.env.yelpKey;
let dataKey = process.env.datafinitiKey;
let classifyUser = process.env.uClassifyUser;
let classifierName = process.env.classifierName;
let classifyKey = process.env.classifyKey;

module.exports = (helpers) => {

  const getBook = function(search, callback) { // get book obj via google books
    const parsedSearch = search.replace(' ', '+');
    request(`https://www.googleapis.com/books/v1/volumes?q=${parsedSearch}`, function(err, res, body) {
      if (err || res.statusCode !== 200) {
        return callback(err || {statusCode: res.statusCode});
      }
      let parsedItem = JSON.parse(body).items[0];
      if (parsedItem) {

        const book = {
          category_id: 1,
          title: titleSlice(parsedItem.volumeInfo.title)
        };
        if (parsedItem.volumeInfo.infoLink) {
          book.url = parsedItem.volumeInfo.infoLink
        } else {
          book.url = "Not available";
        }

        if (parsedItem.volumeInfo.pageCount){
          book.page_length = parsedItem.volumeInfo.pageCount;
        } else {
          book.page_length = -1;
        }
        if(parsedItem.volumeInfo.publishedDate) {
          book.publication_date = Number(parsedItem.volumeInfo.publishedDate.slice(0, 4));
        } else {
          book.publication_date = "0000-00-00";
        }
        if (parsedItem.volumeInfo.categories) {
          book.genre = parsedItem.volumeInfo.categories[0];
        } else {
          book.genre = "None provided";
        }
        if (parsedItem.volumeInfo.authors) {
          book.author = parsedItem.volumeInfo.authors[0];
        } else if (parsedItem.volumeInfo.author){
          book.author = parsedItem.volumeInfo.author;
        } else {
          book.author = "None provided";
        }
        if (parsedItem.volumeInfo.imageLinks) {
          book.img = parsedItem.volumeInfo.imageLinks.smallThumbnail;
        } else {
          book.img = "None provided";
        }
        if (parsedItem.searchInfo) {
          book.description = parsedItem.searchInfo.textSnippet;
        } else if (parsedItem.volumeInfo.description){
          book.description = parsedItem.volumeInfo.description;
        } else {
          book.description = "None provided";
        }
        callback(null, book);
      } else {
        callback(null, null);
      }

    });

  };

  const getRestaurant = function(search, location, callback) {//create object via yelp api and google url api
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
        let restaurantObj = JSON.parse(body).businesses[0];
        if (restaurantObj) {
          const restaurant = {
            category_id: 4,
            title: titleSlice(restaurantObj.name),
            google_map_url: `https://www.google.com/maps/dir/?api=1&origin=${location}&destination=${restaurantObj.coordinates.latitude},${restaurantObj.coordinates.longitude}`
          };

          if (restaurantObj.categories[0].title) {
            restaurant.description = restaurantObj.categories[0].title;
          } else {
            restaurant.description = "None provided";
          }

          if (restaurantObj.url) {
            restaurant.url = restaurantObj.url;
          } else {
            restaurant.url = "None provided";
          }

          if (restaurantObj.image_url) {
            restaurant.img = restaurantObj.image_url;
          } else {
            restaurant.img = "None provided";
          }

          if (restaurantObj.location.address1) {
            restaurant.street_address = restaurantObj.location.address1;
          } else {
            restaurant.street_address = "None provided";
          }

          if (restaurantObj.location.city) {
            restaurant.city = restaurantObj.location.city;
          } else {
            restaurant.city = "None provided";
          }

          if (restaurantObj.location.state) {
            restaurant.province_state = restaurantObj.location.state;
          } else {
            restaurant.province_state = "None provided";
          }

          if (restaurantObj.location.country) {
            restaurant.country = restaurantObj.location.country;
          } else {
            restaurant.country = "None provided";
          }

          callback(null, null, restaurant);
        } else {
          callback(null,null,null);
        }
      });
  };

  const getMovie = function(search, callback) { //create movie object via api call to tMDB api
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
      if (item) {
        let media = {
          category_id: 2,
          title: titleSlice(item.title),
        };

        if (item.overview) {
          media.description = item.overview;
        } else {
          media.description = "None provided";
        }
        if (item.genre_ids[0]){
          movieGenre = item.genre_ids[0];

          for (let genre of genres) {
            if (genre.id === movieGenre) {
              movieGenre = genre.name;
              break;
            }
          }
          media.genre = movieGenre;
        } else {
          media.genre = "None provided";
        }

        if (item.poster_path) {
          media.img = `https://image.tmdb.org/t/p/w154/${item.poster_path}`;
        } else {
          media.img = "None provided";
        }

        if (item.release_date) {
          media.year = item.release_date.slice(0,4);
        } else {
          media.year = -1;
        }

        callback(null,media);
      } else {
        callback(null,null);
      }

    });
  };

  const getTvShow = function(search, callback) {//create tv object calling tMDB api
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
      if (item !== undefined) {
        console.log(item);
        let media = {
          category_id: 2,
          title: titleSlice(item.original_name),
        };

        if (item.overview) {
          media.description = item.overview;
        } else {
          media.description = "None provided";
        }
        if (item.genre_ids[0]){
          tvGenre = item.genre_ids[0];

          for (let genre of genres) {
            if (genre.id === tvGenre) {
              tvGenre = genre.name;
              break;
            }
          }
          media.genre = tvGenre;
        } else {
          media.genre = "None provided";
        }

        if (item.poster_path) {
          media.img = `https://image.tmdb.org/t/p/w154/${item.poster_path}`;
        } else {
          media.img = "None provided";
        }

        if (item.first_air_date) {
          media.year = item.first_air_date.slice(0,4);
        } else {
          media.year = -1;
        }










        callback(null,media);
      } else {
        callback(null,null);
      }
    });
  };

  function getProduct(search, callback) { //api call to datafiniti returns 1 product obj
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

      if (productObj) {

        const product = {
          category_id: 3,
          title: titleSlice(productObj.name),
        };

        if (productObj.descriptions) {
          product.description = productObj.descriptions[0].value
        } else {
          product.description = "None provided";
        }

        if (productObj.brand) {
          product.brand = productObj.brand;
        } else {
          product.brand = "None provided";
        }

        if (productObj.imageURLs[0]) {
          product.img = productObj.imageURLs[0];
        } else {
          product.img = "None provided";
        }

        if (productObj.prices[0].amountMin) {
          product.cost = productObj.prices[0].amountMin;
        } else {
          product.cost = -1;
        }

        if (productObj.sourceURLs[0]) {
          product.url = productObj.sourceURLs[0];
        } else {
          product.url = "None provided";
        }




        callback(null, product);
      } else {
        callback(null, null);
      }
    });
  }


  const getAPIToDo = function getAPIToDo(search, location, callback) {//fires and stores all api
    let toDoObj = {};

    getBook(search, (err, book)=> {
      toDoObj["book"] = book;
      getMovie(search, (err, movie)=> {
        toDoObj.movie = movie;
        getTvShow(search, (err, tv)=> {
          toDoObj.tv = tv;
          getProduct(search, (err, product)=> {
            toDoObj.product = product;
            getRestaurant(search, location, (err, res,restaurant)=> {
              toDoObj.restaurant = restaurant;
              callback(search, null, toDoObj);
            });
          });
        });
      });
    });

  }

  function addToDB(search,objObj, callback) { //add into db after finding the probable item, returns an object as well if wrong item
    getProbability(search, (err, api)=>{
      switch (api) {
      case "book":
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

    callback(null, null, objObj);
  }

  function titleSlice(title) { //slice titles over 140 char
    let newTitle = "";
    if (title.length > 140) {
      newTitle = title.slice(0,140);
      return newTitle;
    } else {
      return title;
    }
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function getProbability(search, callback) { //api call to uclassify to figure out how probable an item is in each category
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

  function changeCategory(category, objObj) {

    switch (category) {
      case "book":
        helpers.addBook(objObj.book);
        break;
      case "restaurant":
        helpers.addRestaurant(objObj.restaurant);
        break;
      case "product":
        helpers.addProduct(objObj.product);
        break;
      case "movie":
        helpers.addMovie(objObj.movie);
        break;
      case "tv":
        helpers.addTvShow(objObj.tv);
    }
  }

  return {getAPIToDo, addToDB, changeCategory, getProduct, getRestaurant};
};
