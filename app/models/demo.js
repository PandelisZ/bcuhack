var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var queueSchema = new Schema({
	name: String,
	street: String,
	website: String,
	rating: Number,
	geo: {
		lat: Number,
		lng: Number
	},
	majestic: []
});

var Demo = mongoose.model('Demo', queueSchema);

module.exports = Demo;
