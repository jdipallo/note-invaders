var Song = require('../models/song_model')

var songController = {
	getAll: function(req, res) {
		Song.find({})
			.populate('melodies')
			.exec(function(error, songs) {
				if (error) {
					console.error('ERROR: Retrieving Songs from MongoDB', error)
				} else {
					res.json(songs)
			}
		})
	}
}
// export our songController module
module.exports = songController