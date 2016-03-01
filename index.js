var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var port = process.env.PORT || 8000;
var apiDb = require('./app/models/api');
var queueDb = require('./app/models/queue')
var majestic = require('./majestic');
var place = require('./place');
var request = require('request');



mongoose.connect('mongodb://bcuhack:bcuhack@ds019068.mlab.com:19068/bcuhack');

function getMajestic(cmd, item0, callback){

  var majestic = 'http://developer.majestic.com/api/json?app_api_key=8AF4E8A4408F14234B3B1E3694BD8654&cmd='+cmd+'&items=1&item0='+item0+'&datasource=fresh'

  request(majestic, function (error, response, body) {
    console.log(body);
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    }
  });

}



router.use(function(req, res, next){
  console.log('Something is happening');
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.send('works');
});

app.get('/api/geturl/:id', function(req,res){
  var id = req.params.id;

  console.log(id);
  var get = 'GetIndexItemInfo';
  var topics = 'GetTopics'

  majestic.getIndexItemInfo(id, function(data){
    res.json(data);
  });
})

function addGoogletoQueue(location, callback) {
  console.log('test')
  queueDb.remove({}, function(err) {
   console.log('collection removed');
  });
    place.search({"radius": 200, "location": location}, function(data){
      for(var i =0; i < data.length; i++){
        tmp = data[i].place_id;
        place.business({"placeid": tmp,}, function(data1){
          if(data1.result.website !== undefined && /^(http(s?):\/\/)?(www\.)+[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/]*)?$/.test(data1.result.website)){
            console.log(data1.result.website);
            majestic.getTopics(data1.result.website, data1.result, function(data){
              var len = data[0].DataTables.Topics.Data.length
              var majesticData = [];
              for(var x = 0 ; x < len; x++){
                majesticData.push({topic: data[0].DataTables.Topics.Data[x].Topic, trust: data[0].DataTables.Topics.Data[x].TopicalTrustFlow});
              }

              var queue = new queueDb();
              queue.name = data[1].name;
              queue.street = data[1].vicinity;
              queue.website = data[1].website;
              queue.rating = 'TomIsTooLazyToCtrl+F Replace';
              queue.geo = {'lat': data[1].geometry.location.lat, 'lng': data[1].geometry.location.lng};
              queue.majestic = majesticData;
              queue.save(function(err, data){
                if(err){
                  console.log('Yo dawg, someone fck up');
                }
                console.log(data);
                callback('allgood');
              })

            });
          }
        });
      }
    });
}


app.get('/api/getbusiness', function(req,res){

  var lat = req.query.lat;
  var lng = req.query.lng;

  var location = lat +','+lng

  addGoogletoQueue(location, function(data){
    queueDb.
        find().
        exec(function(err, data){
          res.json(data);
        });
  });

});

app.get('/api/gettopics/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  majestic.getTopics(id, function(data){
    res.json(data);
  });
})

app.get('/api/haveyoutweetedthislinkyet', function(req, res){
  if(req.query.ping != null){
    res.statusCode = 200;
    res.send('All good bud.')
  }else {
    res.send('This endpoint doesnt do much else')
  }
});

app.get('/api/danielisnotbraveenoughtousevim', function(req,res){

  apiDb.find().exec(function(err, data){
    res.json(data);
  })

});

app.listen(port, function(){
	console.log('Running on ' + port);
});
