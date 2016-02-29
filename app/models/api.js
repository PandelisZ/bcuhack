var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apiSchema = new Schema({
	name: String,
	rating: Number,
	url: String,
	types: [],
	geo: {
		lat: Number,
		lng: Number
	},
});

var Api = mongoose.model('Api', apiSchema);

module.exports = Api;
