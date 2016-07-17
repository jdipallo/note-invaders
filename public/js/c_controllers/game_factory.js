(function() {
	angular.module("gameFactoryModule", ['angular-p5'])
		.factory('noteInvadersP5', noteInvadersP5)

	noteInvadersP5.$inject = ['p5']

	// for now, we are creating our factory here. but, we will move this out
	// to a seperate file for the factory and inject it here.
	function noteInvadersP5(p5) {
		return function(p) {
			var canvasWidth   = 750;
			var canvasHeight  = 575;
			var bottomOfDrawingArea;

			var guitarGun;
			var bulletImg;
			var flyingVImg;
			var noteImages;

			// get the melody from the controller
			var melody = ['B3', 'E3', 'G3', 'D4'];
			var currentMelodyNote = 0;

			// var shuffledMelody = ['G2', 'A2', 'B2', 'C3', 'D3', 'E3','F3',
			// 					  'G3', 'A3', 'B3', 'C4', 'D4', 'E4','F4',
			// 					  'G4'];
			var shuffledMelody = ['D4', 'G3', 'B3', 'E3', 'F4'];
			var gameNotes = [];
			var bullets = [];

			// add a shuffle() method to the Array object to shuffle
			// the array, gameNotes, to randomize the falling of them
			Array.prototype.shuffle = function() {
			  var i = this.length, j, temp;
			  if ( i == 0 ) return this;
			  while ( --i ) {
			     j = Math.floor( Math.random() * ( i + 1 ) );
			     temp = this[i];
			     this[i] = this[j];
			     this[j] = temp;
			  }
			  return this;
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			// pre-load (syncronously) all our images
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			p.preload = function() {
				bg            = p.loadImage('../images/stars.png');
				bulletImg     = p.loadImage('../images/bullet_color.png');
				flyingVImg    = p.loadImage('../images/flying_v.png');
				
				// our notes on the staff
				var qNe3 = '../images/quarter_note_e3.png';
				var qNg3 = '../images/quarter_note_g3.png';
				var qNb3 = '../images/quarter_note_b3.png';
				var qNd4 = '../images/quarter_note_d4.png';
				var qNf4 = '../images/quarter_note_f4.png';

				noteImages = {'E3': { image: p.loadImage(qNe3), srcFile: qNe3},
				                'G3': { image: p.loadImage(qNg3), srcFile: qNg3},
				                'B3': { image: p.loadImage(qNb3), srcFile: qNb3},
				                'D4': { image: p.loadImage(qNd4), srcFile: qNd4},
				                'F4': { image: p.loadImage(qNf4), srcFile: qNf4}
				                };
			  guitarGun     	   = new GuitarGun(canvasWidth, canvasHeight, flyingVImg);
			  bottomOfDrawingArea  = canvasHeight - guitarGun.height;
			}

		    p.setup = function() {
			  p.createCanvas(canvasWidth, canvasHeight);
			  loadGameMelody();
			  setTargetNoteUI(melody[currentMelodyNote]);
			}

			p.draw = function() {
			  p.background(bg);
			  
			  // show our guitar gun
			  guitarGun.show(p);

			   // show our bullets when we shoot with space bar
			  for (var b = bullets.length - 1; b >= 0; b--) {
			    bullets[b].show(p);
			    bullets[b].move();
			    
			    // loop through our notes and see if any bullets hit one
			    for (var j = gameNotes.length - 1; j >= 0; j--) {
			    	if (bullets[b].hitNote(gameNotes[j])) {
				        if (gameNotes[j].name === melody[currentMelodyNote]) {
					        bullets[b].markForDelete();
				        	hitTargetNote(gameNotes[j]);
					        break;
				        } 
				        else { 
					        bullets[b].markForDelete();
				        	hitWrongTargetNote(j)
				        }
			      	}
			    }
			    // if bullet(s) went off screen, lets mark it for deletion
			    if (bullets[b].isOffScreen()) {
			      bullets[b].markForDelete();
			    }
			  }
			  // lets remove from our bullets array any that need deletion so they aren't
			  // painted on the screen
			  for (var b = bullets.length - 1; b >= 0; b--) {
			    if (bullets[b].isMarkedForDelete()) {
			      bullets.splice(b, 1)
			    }
			  }
			  
			// show our notes falling
			  for (var i = 0; i < gameNotes.length; i++) {
			    gameNotes[i].show(p);
			    gameNotes[i].move();
			  }
			  
			  // if user has left or right arrow keys pressed down and holding, 
			  // move the guitar gun
			  if (p.keyIsDown(p.RIGHT_ARROW)) {
			    guitarGun.move(1);
			  }
			  else if (p.keyIsDown(p.LEFT_ARROW)) {
			    guitarGun.move(-1);
			  }
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			// if user taps space bar, shoot!
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
		 	p.keyPressed = function() {
			  if (p.key === ' ') {
			    loadBullet();
			  }  
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	        // 
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			function hitWrongTargetNote(noteIndex) {
				var targetNoteDOM = p.select('#target-note');
				// console.log(noteHit.elt)
				targetNoteDOM.attribute('class', 'wrong-note animated shake');
				var i = p.floor(p.random(shuffledMelody.length));

				console.log("shuffledMelody["+i+"] = ", shuffledMelody[i]);

				gameNotes.splice(noteIndex, 1, new Note(shuffledMelody[i], 
				      		   						    noteImages[shuffledMelody[i]].image, 
				      		   				 		    noteImages[shuffledMelody[i]].srcFile,
				      		   				 		    gameNotes[noteIndex].x, 10, 
										      		    .1 * p.random(1, 7),
										      		    canvasWidth,
										      		    canvasHeight,
										      		    bottomOfDrawingArea))
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	        // 
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			function hitTargetNote(noteHit) {				
				// grab our DOM element ID (melody-progress - bootstrap column) to
				// add this target's image to show the user what their progress is
			    var melodyProgressDOM = p.select('#melody-progress');
			    var leftPosition = 75 * (currentMelodyNote);
			    // melodyProgressDOM.html(melodyProgressDOM.elt.innerHTML + "\n" 
			    // 		+ "<img style='left:" + leftPosition + "px;'" 
			    // 		+ "class='animated bounceInRight melody-progress-image img-responsive' src='" 
			    // 		+ noteHit.imgFile + "'>");
			     melodyProgressDOM.html(melodyProgressDOM.elt.innerHTML + "\n" 
			    		+ "<div><img style='left:" + leftPosition + "px;'" 
			    		+ "class='animated bounceInRight melody-progress-image img-responsive' src='" 
			    		+ noteHit.imgFile + "'></div>");

			    // lets remove all the incorrect decoys from our array so they will not
			    // rendered to the canvas
				gameNotes.splice(0);

				// we are now on the next note in the melody
				currentMelodyNote++; 
				
				// set our TARGET NOTE: header area to indicate to the user the next target note
				setTargetNoteUI(melody[currentMelodyNote])

				// now reload our gameMelody which is the Note objects that are drawn on the canvas
				loadGameMelody();
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			function loadGameMelody() {
			  // lets shuffle our melody to have the notes come down in a random pattern
			  // we still the melody array of the original melody to compare against when user 
			  // completes/wins the game
			  shuffledMelody.shuffle();
			  
			  var xPosition = 95;

			  for (var i = 0; i < shuffledMelody.length; i++) {
			    gameNotes.push(
			      new Note(shuffledMelody[i], 
			      		   noteImages[shuffledMelody[i]].image, 
			      		   noteImages[shuffledMelody[i]].srcFile,
			      		   xPosition, 10, 
			      		   .1 * p.random(1, 7),
			      		   canvasWidth,
			      		   canvasHeight,
			      		   bottomOfDrawingArea));
			    xPosition += 140;
			  }
			}
		
			function setTargetNoteUI(noteName) {
				var targetNoteDOM = p.select('#target-note');
				targetNoteDOM.html("TARGET NOTE: " + noteName)
			}

			function loadBullet() {
			  bullets.push(new Bullet(guitarGun.x  + 2, guitarGun.y - guitarGun.height + 50, 10, bulletImg))
			}	
		}
	}
})()