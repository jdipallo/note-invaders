var Song = require('../models/song_model')

var songController = {
	getAll: function(req, res) {
		// console.log("dude, you are here! in getAll() in the songController")
		Song.find({}, function(error, songs) {
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