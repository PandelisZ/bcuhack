var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var queueSchema = new Schema({
	name: String,
	street: String,
	website: String,
	rating: String,
	geo: {
		lat: Number,
		lng: Number
	},
	majestic: []
});

var Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;
