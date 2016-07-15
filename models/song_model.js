var mongoose = require('mongoose')

var SongSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	melodies: [{ 
		name: String,
		melody: [String]
	}]
})

var Song = mongoose.model('Song', SongSchema)

module.exports = Song