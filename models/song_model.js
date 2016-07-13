var mongoose = require('mongoose')

var SongSchema = mongoose.Schema({
	name: String,
	melodies: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Melody'
	}]
})

var Song = mongoose.model('Song', SongSchema)

module.exports = Song