(function() {
	angular.module("gameFactoryModule", ['angular-p5'])
		.factory('noteInvadersP5', noteInvadersP5)

	noteInvadersP5.$inject = ['p5']

	// for now, we are creating our factory here. but, we will move this out
	// to a seperate file for the factory and inject it here.
	function noteInvadersP5(p5) {
		return function(p) {
			var songName 		= homeCtrl.selectedSong.name;
			var melodyName 		= homeCtrl.selectedMelody.name;
			var canvasWidth   	= 750;
			var canvasHeight  	= 550;
			var bottomOfDrawingArea;

			var guitarGun;
			var bulletImg;
			var flyingVImg;
			var noteImages;

			// get the melody from the controller
			var melody = ['B3', 'E3', 'G3', 'D4'];
			var noteToMatchIndex = 0;

			// var notePoolShuffled = ['G2', 'A2', 'B2', 'C3', 'D3', 'E3','F3',
			// 					  'G3', 'A3', 'B3', 'C4', 'D4', 'E4','F4',
			// 					  'G4'];
			var notePoolShuffled = ['D4', 'G3', 'G3', 'E3', 'F4'];
			var gameNotes = [];
			var bullets = [];

			var gameOver 			= false;
			var score    			= 0;
			var correctNotePts 		= 100;
			var wrongNotePts 		= -100;
			var theNoteGotByYaPts 	= -25;
			var chances				= 3;
			var rounds				= 0;

			// sound effects and piano samples
			var laser;
			var noteSounds;
			var droneBackground;

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

			function setSongMelodyTitle(){
				var songMelodyNameDOM = p.select('#song-melody-name');
				songMelodyNameDOM.html(songName + "-" + melodyName)
			}

			function setTargetNoteUI(msg, noteName) {
				var targetNoteDOM = p.select('#target-note');
				targetNoteDOM.html(msg + noteName)
			}
			function setScoreTitle() {
				var scoreTitleDOM = p.select('#score-title');
				console.log("in setScoreTitle: score ", score )
				scoreTitleDOM.html("Score: " + score);
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

			  laser 	   = p.loadSound('../sounds/laser_5.mp3');

			  bottomOfDrawingArea  = canvasHeight - guitarGun.height;
			}

		    p.setup = function() {
			  p.createCanvas(canvasWidth, canvasHeight);
			  loadGameMelody();
			  setScoreTitle();
			  setTargetNoteUI('TARGET NOTE: ', melody[noteToMatchIndex]);
			  setSongMelodyTitle();
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
				        if (gameNotes[j].name === melody[noteToMatchIndex]) {
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
			  	laser.play();
			    loadBullet();
			  }  
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	        // 
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			function hitWrongTargetNote(noteIndex) {
				var targetNoteDOM = p.select('#target-note');
				var i = p.floor(p.random(notePoolShuffled.length));

				// decrement score, increment round - user gets 3 rounds before we go to the next note
				// in the melody
				score += wrongNotePts;
				setScoreTitle();
				rounds++;

				targetNoteDOM.attribute('class', 'wrong-note animated shake');
				gameNotes.splice(noteIndex, 1, new Note(notePoolShuffled[i], 
				      		   						    noteImages[notePoolShuffled[i]].image, 
				      		   				 		    noteImages[notePoolShuffled[i]].srcFile,
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
					// set target note info area green
					var targetNoteDOM = p.select('#target-note');
					targetNoteDOM.attribute('class', 'default-target-note-msg col-xs-8 correct-note animated flash pulse');

					// lets give the user some points!
					score += correctNotePts;
					setScoreTitle();

					// grab our DOM element ID (melody-progress - bootstrap column) to
					// add this target's image to show the user what their progress is
				    var melodyProgressDOM = p.select('#melody-progress');
				    var leftPosition = 75 * (noteToMatchIndex);
				   
				     melodyProgressDOM.html(melodyProgressDOM.elt.innerHTML + "\n" 
				    		+ "<div><img style='left:" + leftPosition + "px;'" 
				    		+ "class='animated bounceInRight melody-progress-image img-responsive' src='" 
				    		+ noteHit.imgFile + "'></div>");

				    // lets remove all the incorrect decoys from our array so they will not
				    // rendered to the canvas
					gameNotes.splice(0);

					// if this is the last note in the melody, game WON!!!
					if (noteToMatchIndex === melody.length -1) {
						gameOver = true;
						gameNotes.splice(0);
						setTargetNoteUI("COMPLETED!", '')
					}
					else {
						// we are now on the next note in the melody
						noteToMatchIndex++; 
						
						// now reload our gameMelody which is the Note objects that are drawn on the canvas
						loadGameMelody();
				}
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 		    // lets shuffle our melody to have the notes come down in a random pattern
			// we still the melody array of the original melody to compare against when user 
			// completes/wins the game
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			function loadGameMelody() {
				// reset our rounds
				rounds =0;

				notePoolShuffled.shuffle();

			  	// if the noteToMatchIndex melody note is not part of our shuffled notes, gameNotes, 
			  	// (Note() objects are the ones painted/falling on the drawing canvas), take out
				// one, and add our noteToMatchIndex note to gameNotes
			  	var melodyNoteInShuffle = false;
			  	for (var i = 0; i < 5; i++) {
			  		if (notePoolShuffled[i] === melody[noteToMatchIndex]) {
			  			// console.log("yes, we have a", melody[noteToMatchIndex], "in", notePoolShuffled)
			  			melodyNoteInShuffle = true;
			  			break;
			  		}
			  	}
			  	// randomly splice out a note from gameNotes and insert our noteToMatchIndex
			  	// from our melody - so the user can see/have the opportunity to shoot it!
			  	if (!melodyNoteInShuffle) {
			  		// console.log("we dot NOT have a", melody[noteToMatchIndex], "in", notePoolShuffled)
		  			var randomIndex = p.floor(p.random(0, notePoolShuffled.length))
		  			var splicedNote = notePoolShuffled.splice(randomIndex, 1, melody[noteToMatchIndex])
			  	}

			  	var xPosition = 95;

			  	for (var i = 0; i < 5; i++) {
			   	 gameNotes.push(
			    	  new Note(notePoolShuffled[i], 
			      			   noteImages[notePoolShuffled[i]].image, 
			      			   noteImages[notePoolShuffled[i]].srcFile,
			      		 	  xPosition, 10, 
			    	  		   .1 * p.random(1, 7),
			      			   canvasWidth,
			      			   canvasHeight,
			      			   bottomOfDrawingArea));
			    	xPosition += 140;
			  	}
			}
		
			function loadBullet() {
			  bullets.push(new Bullet(guitarGun.x  + 2, guitarGun.y - guitarGun.height + 50, 10, bulletImg))
			}	

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			// jQuery listener for the end of any animate.css event
			// Style our target note text header after a wrong/correct note
			// if game over, leave our style of correct note (green text) 
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			$('#target-note').bind
				('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				var targetNoteDOM = p.select('#target-note');
				
				if (!gameOver) {
					// set our TARGET NOTE: header area to indicate to the user the next target note
					setTargetNoteUI('TARGET NOTE: ', melody[noteToMatchIndex])
					// targetNoteDOM.attribute('class', 'default-target-note-msg col-xs-8 animated fadeIn');
					targetNoteDOM.class('default-target-note-msg col-xs-8 animated fadeIn');
				}
				else {
					setTargetNoteUI('NICE JOB!! YOUR SCORE WAS: ', score)				
				}
			});

		}	// end of return function(p)
	}	// end of noteInvadersP5()
})()