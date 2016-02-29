var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var port = process.env.PORT || 8000;
var apiDb = require('./app/models/api');

var request = require('request');



mongoose.connect('mongodb://bcuhack:bcuhack@ds019068.mlab.com:19068/bcuhack');

function getMajestic(cmd, item0){

  var majestic = 'http://developer.majestic.com/api/json?app_api_key=8AF4E8A4408F14234B3B1E3694BD8654&cmd='+cmd+'&items=1&item0='+item0+'&datasource=fresh'

  request(majestic, function (error, response, body) {
    console.log(body);
    if (!error && response.statusCode == 200) {
      return JSON.parse(body);
    }
  })

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
  var id = 'http://' + req.params.id;

  console.log(id);

  var sendback = getMajestic('GetIndexItemInfo', id);

  consoe.log(sendback);

  res.json()


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

  console.log(req);

  apiDb.find().exec(function(err, data){
    res.json(data);
  })

});

app.listen(port, function(){
	console.log('Running on ' + port);
});
