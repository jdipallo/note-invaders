// require express but only instaniate the Router object from it
// we don't need the whole express module here
var apiRouter = require('express').Router()

// require our controllers here for our routes to call 
var noteInvadersCtrl = require('./s_controllers/song_controller')

// setup our routes calling the appropriate methods on our controller
// example: localhost:PORT/api/v0/songs
apiRouter.route('/songs')
	.get(noteInvadersCtrl.getAll)

// exporting our module
module.exports = apiRouter



