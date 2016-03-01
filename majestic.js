var request = require('request');
var api_key = '8AF4E8A4408F14234B3B1E3694BD8654';


function makeRequest(url){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return JSON.parse(body);
    }
  });
}


module.exports.getIndexItemInfo = function(item0, callback){
  var majestic = 'http://developer.majestic.com/api/json?app_api_key='+api_key+'&cmd=GetIndexItemInfo&items=1&item0='+item0+'&datasource=fresh'

  request(majestic, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    }
  });
}



module.exports.getTopics = function(item0, data, callback){
  var majestic = 'http://api.majestic.com/api/json?app_api_key='+api_key+'&cmd=GetTopics&item='+item0+'&datasource=fresh&count=10'

  request(majestic, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var returnCal = [JSON.parse(body), data];
      callback(returnCal);
    }
  });
}
