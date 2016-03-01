var mongoose = require('mongoose');
var apiDb = require('./app/models/api');
var queueDb = require('./app/models/queue');
var place = require('./place');
var majestic = require('./majestic');
mongoose.connect('mongodb://bcuhack:bcuhack@ds019068.mlab.com:19068/bcuhack');

queueDb.remove({}, function(err) {
 console.log('collection removed');
});
  place.search({"radius": 200}, function(data){
    for(var i =0; i < data.length; i++){
      tmp = data[i].place_id;
      place.business({"placeid": tmp}, function(data1){
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
            queue.geo = {'lat': data[1].geometry.location.lat, 'lng': data[1].geometry.location.lng};
            queue.majestic = majesticData;
            queue.save(function(err, data){
              if(err){
                console.log('Yo dawg, someone fck up');
              }
              console.log(data);
            })



          });
        }



      });
    }
  });
