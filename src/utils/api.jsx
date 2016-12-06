var Fetch = require('whatwg-fetch');
var rootUrl = 'http://localhost:5000/';
var apiKey = '31dfb4730c2d6e5';
console.log('api');


module.exports = window.api = {
  get: function(url) {
    console.log(url)
    return fetch(rootUrl + url)
    .then(function(response){
      return response.json()
    })
  }
};

