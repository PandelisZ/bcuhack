request = require('request');

module.exports.search = function(data, callback){

  get = {
      //"key": "AIzaSyDA5DX-cT2GxcDlUFqGwmOk8tweI0MjvZQ",
      "key": "AIzaSyA-f0suDaAIa-PW3tSvRtIovE4LXkHM5Jw",
      // "key": "AIzaSyDoNuexkcgTIzOefht633bhW40h5CfOHOk",
      "location": '52.482982,-1.8855607',
      "radius": 1500,
    }

    for(var key in data) {
      get[key] = data[key];
    }//optional parameters

    var string = "?";

    for(var key in get) {
      if (get.hasOwnProperty(key)) {
        string += key + "=" + get[key] + "&";
      }
    }

    request("https://maps.googleapis.com/maps/api/place/nearbysearch/json" + string, function(error, response, body) {

      // var rand = Math.floor(Math.random() * JSON.parse(body).results.length)
      //
      // first = JSON.parse(body).results[0];
      //
      // result = {
      //   "name": first.name, //image size down here
      //   //"icon": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=" + first.photos[0].photo_reference + "&key=" + get.key,
      //   "location": first.geometry.location,
      //   "vicinity": first.vicinity
      // };
      var results = []
      var resultingJson = JSON.parse(body);
      for(var i = 0; i < resultingJson.results.length; i++){
        var returned = {}
        returned['place_id'] = resultingJson.results[i].place_id
        returned['name'] = resultingJson.results[i].name
        returned['street'] = resultingJson.results[i].vicinity
        results.push(returned);
      }

      callback(results);
    });


}

module.exports.business  = function(data, callback){

  get = {
    //"key": "AIzaSyDA5DX-cT2GxcDlUFqGwmOk8tweI0MjvZQ",
      "key": "AIzaSyA-f0suDaAIa-PW3tSvRtIovE4LXkHM5Jw",
      // "key": "AIzaSyDoNuexkcgTIzOefht633bhW40h5CfOHOk",
      "placeid": "ChIJN1t_tDeuEmsRUsoyG83frY4"
    }

    for(var key in data) {
      get[key] = data[key];
    }//optional parameters

    var string = "?";

    for(var key in get) {
      if (get.hasOwnProperty(key)) {
        string += key + "=" + get[key] + "&";
      }
    }

    request("https://maps.googleapis.com/maps/api/place/details/json" + string, function(error, response, body) {


      callback(JSON.parse(body));
    });

}
