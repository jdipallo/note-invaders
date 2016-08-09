(function() {
	angular.module("gameFactoryModule", ['angular-p5'])
		.factory('noteInvadersP5', noteInvadersP5)

	noteInvadersP5.$inject = ['p5']

	// for now, we are creating our factory here. but, we will move this out
	// to a seperate file for the factory and inject it here.
	function noteInvadersP5(p5) {
		return function(p) {
			var songName 		= gameCtrl.selectedSongName;
			var melodyName      = gameCtrl.selectedMelodyName;
			var melody 			= gameCtrl.selectedMelody;
			var tempo 			= 120;
			var canvasWidth   	= 750;
			var canvasHeight  	= 550;
			var bottomOfDrawingArea;
			var progressNotesPosition = 40;

			var guitarGun;
			var bulletImg;
			var flyingVImg;
			var noteImages;
			var spaceShip;
			var monkeyOnSaucerImg;
			var saucerSpeed = 2;

			var noteToMatchIndex = 0;

			var notePoolShuffled = ['C4','D4','E4','F4','F#4','G4','A4','B4', 
									'C5','D5','E5','F5','G5','A5','B5'];
			
			var gameNotes = [];
			var bullets = [];

			var gameOver 			= false;
			var score    			= 0;
			var correctNotePts 		= 100;
			var wrongNotePts 		= -100;
			var theNoteGotByYaPts 	= -25;
			var chances				= 5;
			var rounds				= 0;
			var hitSpaceShipMonkey  = 500;
			var timer;
			var timerDOM;
			var timerCounter		= 0;
			var elapsedTime         = 0;

			// sound effects and piano samples
			var laser;
			var noteSounds;
			var droneBackground;
			var wrongNoteBuzz;
			var billTed;
			var spaceShipFlying;
			var loopingSpaceship = false;
			var flyingRandom = 1000;
			var monkeyScream;
			var explosion;

			var midiMap = {'C4': 60,
						   'D4': 62,					   	 
						   'E4': 64,
						   'F4': 65,
						   'F#4': 66,
			               'G4': 67,
						   'A4': 69, 
			               'B4': 71, 
						   'C5': 72,
			               'D5': 74,
						   'E5': 76,
			               'F5': 77,
						   'G5': 79,
						   'A5': 81,
						   'B5': 83
						  };

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

			function noteOn(midiNote, velocity) {
				if (midiMap[melody[noteToMatchIndex]] === midiNote) {
						noteSounds[melody[noteToMatchIndex]].play();
				}
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
				scoreTitleDOM.html("Score: " + score);
			}

			// =-=---=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			// IFFY! so that variable i can be resolved and 
			// play our notes in succession
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			function playMelody() {
				if (noteSounds != null) {
					for (var i = 0; i < melody.length; i++) {
						(function(i) { 
								setTimeout(function() {
										noteSounds[melody[i]].play()
								}, i * 500)
						})(i)
					}
				}
			}
			// lets callback to our gameController, passing in this function so 
			// we can call it 
			gameCtrl.setMelodyFn(playMelody)

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			// CB function which is called every 1 second
			// to update our timer DOM element to show to 
			// the user how long they have been playing the
			// game
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			function updateTimer() {
				timerDOM = p.select('#timer');

			    elapsedTime = moment() - startTime;
				timerDOM.html("Time: " + moment(elapsedTime).format("mm:ss"));

				// lets random calculate if we should show our monkey on the saucer
				var rand = p.floor(p.random(1, flyingRandom));
				if (rand < 50) {
					// console.log("Setting showSpaceShip. rand = ", rand);
					spaceShip.showSpaceShip = true;
				}
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			// pre-load (syncronously) all our images - we 
			// can be sure by the time we hit setup/draw
			// these resources are in fact loaded.
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			p.preload = function() {
				bg             = p.loadImage('../images/stars.png');
				bulletImg      = p.loadImage('../images/bullet_color.png');
				flyingVImg     = p.loadImage('../images/flying_v.png');
				monkeyOnSaucerImg = p.loadImage('../images/monkey_on_saucer.png');
				
				// our notes on the staff
				var qNC4 = '../images/notes/C4q.png';
				var qND4 = '../images/notes/D4q.png';
				var qNE4 = '../images/notes/E4q.png';
				var qNF4 = '../images/notes/F4q.png';
				var qNFSHARP4 = '../images/notes/FSHARP4q.png';
				var qNG4 = '../images/notes/G4q.png';
				var qNA4 = '../images/notes/A4q.png';
				var qNB4 = '../images/notes/B4q.png';
				var qNC5 = '../images/notes/C5q.png';
				var qND5 = '../images/notes/D5q.png';
				var qNE5 = '../images/notes/E5q.png';
				var qNF5 = '../images/notes/F5q.png';
				var qNG5 = '../images/notes/G5q.png';
				var qNA5 = '../images/notes/A5q.png';
				var qNB5 = '../images/notes/B5q.png';


				noteImages = { 'C4': {image: p.loadImage(qNC4), srcFile: qNC4},
						   	   'D4': { image: p.loadImage(qND4), srcFile: qND4},
							   'E4': { image: p.loadImage(qNE4), srcFile: qNE4},
							   'F4': { image: p.loadImage(qNF4), srcFile: qNF4},
							   'F#4': { image: p.loadImage(qNFSHARP4), srcFile: qNFSHARP4},
				               'G4': { image: p.loadImage(qNG4), srcFile: qNG4},
							   'A4': { image: p.loadImage(qNA4), srcFile: qNA4},
				               'B4': { image: p.loadImage(qNB4), srcFile: qNB4},
							   'C5': { image: p.loadImage(qNC5), srcFile: qNC5},
				               'D5': { image: p.loadImage(qND5), srcFile: qND5},
							   'E5': { image: p.loadImage(qNE5), srcFile: qNE5},
				               'F5': { image: p.loadImage(qNF5), srcFile: qNF5},
							   'G5': { image: p.loadImage(qNG5), srcFile: qNG5},
							   'A5': { image: p.loadImage(qNA5), srcFile: qNA5},
							   'B5': { image: p.loadImage(qNB5), srcFile: qNB5}
							 };
				guitarGun     	    = new GuitarGun(canvasWidth, canvasHeight, flyingVImg);
				bottomOfDrawingArea = canvasHeight - guitarGun.height;
				spaceShip		    = new SpaceShip(p.random(110, bottomOfDrawingArea - 110), canvasWidth, canvasHeight, saucerSpeed, 
											  	    monkeyOnSaucerImg, bottomOfDrawingArea);
				// load spaceship sounds
				spaceShipFlying = p.loadSound('../sounds/flying_saucer.mp3');
			 	monkeyScream 	= p.loadSound('../sounds/monkey_scream.mp3');
			 	explosion 		= p.loadSound('../sounds/explosion.mp3');

				laser 	   		   = p.loadSound('../sounds/laser_5.mp3');
				wrongNoteBuzz 	   = p.loadSound('../sounds/wrong_buzz.mp3');
				billTed 		   = p.loadSound('../sounds/bill_ted.mp3');
				droneBackground    = p.loadSound('../sounds/pulsating_beat_busy_drone_short.mp3')
				noteSounds = {'C4' : p.loadSound('../sounds/C4.mp3'),
							  'D4' : p.loadSound('../sounds/D4.mp3'),
							  'E4' : p.loadSound('../sounds/E4.mp3'),
							  'F4' : p.loadSound('../sounds/F4.mp3'),
							  'F#4' : p.loadSound('../sounds/FSHARP4.mp3'),
							  'G4' : p.loadSound('../sounds/G4.mp3'),
							  'A4' : p.loadSound('../sounds/A4.mp3'),
							  'B4' : p.loadSound('../sounds/B4.mp3'),
							  'C5' : p.loadSound('../sounds/C5.mp3'),
							  'D5' : p.loadSound('../sounds/D5.mp3'),
							  'E5' : p.loadSound('../sounds/E5.mp3'),
							  'F5' : p.loadSound('../sounds/F5.mp3'),
							  'G5' : p.loadSound('../sounds/G5.mp3'),
				};
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			// P5 Runs this function once after preload 
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		    p.setup = function() {
			  p.createCanvas(canvasWidth, canvasHeight);
			  
			  droneBackground.loop();
			  gameCtrl.setMusic(droneBackground);
			  gameCtrl.setSpaceShipFlying(spaceShipFlying);

			  loadGameMelody();
			  setScoreTitle();
			  setTargetNoteUI('TARGET NOTE: ', melody[noteToMatchIndex]);
			  setSongMelodyTitle();
			  
			  startTime = moment();
			  timerInterval = setInterval(updateTimer, 1000);
			  gameCtrl.setTimerInterval(timerInterval);
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			// P5 Runs this function continously in a loop - this is 
			// how we do are animation
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			p.draw = function() {
			  p.background(bg);

			  if (!gameOver) {			  	
				  // show our guitar gun
				  guitarGun.show(p);

				  // if our random generator (very simple) in updateTimer() say so,
				  // then show our spaceShip with our monkey
					if (spaceShip.showSpaceShip) {
						if (!loopingSpaceship) {
							loopingSpaceship = true;
							spaceShipFlying.loop();
						}
						spaceShip.show(p);
					 	spaceShip.move(p);
				 	} else {
				 		spaceShipFlying.stop();
				 		loopingSpaceship = false;
				 	}

				   // show our bullets when we shoot with space bar
				  for (var b = bullets.length - 1; b >= 0; b--) {
				    bullets[b].show(p);
				    bullets[b].move();
				    
				    // loop through our notes and see if any bullets hit one
				    for (var j = gameNotes.length - 1; j >= 0; j--) {
				    	if (bullets[b].hit(gameNotes[j])) {
					        if (gameNotes[j].name === melody[noteToMatchIndex]) {
					        	noteSounds[gameNotes[j].name].play();
						        bullets[b].markForDelete();
					        	hitTargetNote(gameNotes[j]);
						        break;
					        } 
					        else { 
						        bullets[b].markForDelete();
					        	hitWrongTargetNote(j)
					        }
				      	}
				      	// if one of the bullets hit the spaceship.....
				      	if (spaceShip.showSpaceShip) {
				      		if (bullets[b].hit(spaceShip)) {
				      			explosion.play();
				      			monkeyScream.play();
				      			// mark bullet for delete and remove the spaceShip
				      			spaceShipFlying.stop();
				      			spaceShip.hideSpaceShip(p);
				      			bullets[b].markForDelete();
				      			// add 500 points to our score!
				      			score += hitSpaceShipMonkey;
								setScoreTitle();
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
				} 		// end of gameOver()
			} // end of p.draw()

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			// if user taps space bar, shoot!
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
		 	p.keyPressed = function() {
		 		if (!gameOver) {
			  		if (p.key === ' ') {
			  			laser.play();
			    		loadBullet();
			  		} 
		  		} 
			}

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	        // 
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			function hitWrongTargetNote(noteIndex) {
				var targetNoteDOM = p.select('#target-note');
				var i = p.floor(p.random(notePoolShuffled.length));

				// if (misses >= chances ) {
				// 	missedYourNote.play();
				// }
				// play wrong note sound
				wrongNoteBuzz.play();
				
				// decrement score, increment round - user gets 3 rounds before we go to the next note
				// in the melody
				score += wrongNotePts;
				setScoreTitle();
				rounds++;

				targetNoteDOM.attribute('class', 'wrong-note wrong-note animated shake col-xs-6');
				gameNotes.splice(noteIndex, 1, new Note(notePoolShuffled[i], 
				      		   						    noteImages[notePoolShuffled[i]].image, 
				      		   				 		    noteImages[notePoolShuffled[i]].srcFile,
				      		   				 		    gameNotes[noteIndex].x, 0, 
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
					targetNoteDOM.attribute('class', 'correct-note animated flash pulse col-xs-6');

					// lets give the user some points!
					score += correctNotePts;
					setScoreTitle();

					// grab our DOM element ID (melody-progress - bootstrap column) to
					// add this target's image to show the user what their progress is
				    var melodyProgressDOM = p.select('#melody-progress');
				    var leftPosition = progressNotesPosition * (noteToMatchIndex);
				   
				     melodyProgressDOM.html(melodyProgressDOM.elt.innerHTML + "\n" 
				    		+ "<div><img style='left:" + leftPosition + "px;'" 
				    		+ "class='animated bounceInRight melody-progress-image img-responsive' src='" 
				    		+ noteHit.imgFile + "'></div>");

				    // lets remove all the incorrect decoys from our array so they will not
				    // rendered to the canvas
					gameNotes.splice(0);

					// if this is the last note in the melody, game WON!!!
					if (noteToMatchIndex === melody.length - 1) {
						clearInterval(timerInterval);
						gameOver = true;
						gameCtrl.setGameOver(true);
						var gameOverDOM = p.select('.game-over');
						gameOverDOM.style('display', 'inline-block');
						gameNotes.splice(0);
						billTed.play();
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
			  			melodyNoteInShuffle = true;
			  			break;
			  		}
			  	}
			  	// randomly splice out a note from gameNotes and insert our noteToMatchIndex
			  	// from our melody - so the user can see/have the opportunity to shoot it!
			  	if (!melodyNoteInShuffle) {
		  			var randomIndex = p.floor(p.random(0, 5))
		  			var splicedNote = notePoolShuffled.splice(randomIndex, 1, melody[noteToMatchIndex])
			  	}

			  	var xPosition = 95;

			  	for (var i = 0; i < 5; i++) {
			  		console.log("notePoolShuffled[i] = ", notePoolShuffled[i])

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

			function removeAllGraphics() {
				bullets.splice(0);
				guitarGun = null;
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
					// targetNoteDOM.attribute('class', 'default-target-note-msg col-xs-6 animated fadeIn');
					targetNoteDOM.class('default-target-note-msg col-xs-6 animated fadeIn');
				}
				else {
					setTargetNoteUI('NICE JOB!!!', '')
					removeAllGraphics();

					droneBackground.setVolume(0, 2.0);
					droneBackground.stop();
					spaceShipFlying.stop();			
				}
			});

			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			// read MIDI messages coming in so we can trigger piano notes
			// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-
			var midi;
		
			// request MIDI access
			if(navigator.requestMIDIAccess){
				navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure);
			}
			else {
				alert("No MIDI support in your browser.");
			}

			// midi functions
			function onMIDISuccess(midiAccess){
				midi = midiAccess;
				var inputs = midi.inputs.values();
				// loop through all inputs
				for(var input = inputs.next(); input && !input.done; input = inputs.next()){
					// listen for midi messages
					input.value.onmidimessage = onMIDIMessage;
				}
			}

			function onMIDIMessage(event){
				var data = event.data, 
						cmd = data[0] >> 4,
						channel = data[0] & 0xf,
						type = data[0], // ignore [inconsistent between devices]
						note = data[1], 
						velocity = data[2];

				if (type === 144) {
					noteOn(note, velocity);
				}
				else if (type === 128) {
					noteOff(note, velocity);
				}
			}
			// function noteOn(midiNote, velocity){
			// 	console.log("Dude note on!", midiNote)
			// }
			function noteOff(midiNote, velocity){
				console.log("Dude note off!", midiNote)
				
			}
			function onMIDIFailure(e){
				log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
			}

		}	// end of return function(p)
	}	// end of noteInvadersP5()




})()