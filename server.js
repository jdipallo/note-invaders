// require our modules and middleware
var express 	= require('express')
var bodyParser 	= require('body-parser')
var logger		= require('morgan')
var mongoose	= require('mongoose')
var apiRouter 	= require('./api_router')
// to do - express-session and passport

// our port set to 3030 if process.env.port is not set
var port 		= process.env.PORT || 3030

// create our app
var app 		= express()

// mount our middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mount our own apiRouter (which is express' Router())
// being very RESTful here
app.use('/api/v0', apiRouter)

// serve up any public resources/assets/etc.
app.use(express.static(__dirname + '/public'))

// connect to our mongo DB called noteinvaders
mongoose.connect('mongodb://localhost/noteinvaders', 
	function(error){
	    if( error ) {
	        console.error('ERROR: Connecting to mongoose:db:noteinvaders', error)
	    } else {
	        console.info('SUCCESS: Connected successfully to mongoose:db:noteinvaders')
	    }
	})

// start our server and listen on our port
app.listen(port, function(error) {
	if (error) {
		console.error('ERROR: Starting server listening on port:', port)
	} else {
		console.info('SUCCESS: Server started on port:', port)
	}
})
