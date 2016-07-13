var mongoose = require('mongoose')

var MelodySchema = mongoose.Schema({
	name: String,
	notes: [String]
})

var Melody = mongoose.model('Melody', MelodySchema)

module.exports = Melody