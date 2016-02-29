var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var port = process.env.PORT || 8000;
var apiDb = require('./app/models/api');


mongoose.connect('mongodb://bcuhack:bcuhack@ds019068.mlab.com:19068/bcuhack');


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

app.get('/api/haveyoutweetedthislinkyet', function(req, res){
  if(req.query.ping != null){
    res.statusCode = 400;
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
