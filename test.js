var mongoose = require('mongoose');
var apiDb = require('./app/models/api');
mongoose.connect('mongodb://bcuhack:bcuhack@ds019068.mlab.com:19068/bcuhack');

function addData(name, rating, types){

  var m = new apiDb();
  m.name = name;
  m.rating = rating;
  m.types = types;
  m.save(function (err, data) {



    console.log('Saved with id: ' + data._id);
  });

}

var arr = []

arr.push({name: 'Search', rating: 99});
arr.push({name: 'Procrastination', rating: 80});
arr.push({name: 'Pancakes', rating: 10});

addData('Google', '9', arr);
