(function() {
	angular.module('gameCtrlModule', ['angular-p5'])
		.controller('gameController', gameController)
		.factory('noteInvadersP5', noteInvadersP5)

	gameController.$inject = ['gameFactory']
	noteInvadersP5.$inject = ['p5']

	function gameController(gameFactory) {
		gameCtrl = this;

		gameCtrl.title = "Home Controller!"		
	}

	// for now, we are creating our factory here. but, we will move this out
	// to a seperate file for the factory and inject it here.
	function noteInvadersP5(p5) {
			return function(p) {
			var canvasWidth   = 810;
			var canvasHeight  = 675;
			var gameOverLine = 160;

			var guitarGun;
			var bulletImg;
			var flyingVImg;
			var noteImages;

			// get the melody from the controller
			var shuffledMelody = melody = gameCtrl.getMelody();
			var melodyOfNotes = [];
			var bullets = [];

			// add a shuffle() method to the Array object to shuffle
			// the array, melodyOfNotes, to randomize the falling of them
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

			p.preload = function() {
			  bg            = p.loadImage('../images/stars.png');
			  bulletImg     = p.loadImage('../images/bullet_color.png');
			  flyingVImg    = p.loadImage('../images/flying_v.png');
			  // noteImages = {'C3': loadImage('assets/quarter_note_c3.png'),
			  //               'D3': loadImage('assets/quarter_note_d3.png'),
			  //               'E3': loadImage('assets/quarter_note_e3.png'),
			  //               'F3': loadImage('assets/quarter_note_f3.png'),
			  //               'G3': loadImage('assets/quarter_note_g3.png'),
			  //               'A3': loadImage('assets/quarter_note_a3.png'),
			  //               'B3': loadImage('assets/quarter_note_b3.png'),
			  //               'C4': loadImage('assets/quarter_note_c4.png'),
			  //               'D4': loadImage('assets/quarter_note_d4.png'),
			  //               'E4': loadImage('assets/quarter_note_e4.png'),
			  //               'F4': loadImage('assets/quarter_note_f4.png'),
			  //               'G4': loadImage('assets/quarter_note_g4.png'),
			  //               'A4': loadImage('assets/quarter_note_a4.png'),
			  //               'B4': loadImage('assets/quarter_note_b4.png'),
			  //               'C4': loadImage('assets/quarter_note_c5.png')
			  //               };
			  noteImages = {'E3': p.loadImage('../images/quarter_note_e3.png'),
			                'G3': p.loadImage('../images/quarter_note_g3.png'),
			                'B3': p.loadImage('../images/quarter_note_b3.png'),
			                'D4': p.loadImage('../images/quarter_note_d4.png'),
			                'F4': p.loadImage('../images/quarter_note_f4.png'),
			                };
			  guitarGun     = new GuitarGun(canvasWidth, canvasHeight, flyingVImg);
			}

		    p.setup = function() {
			  p.createCanvas(canvasWidth, canvasHeight);
			  
			  loadMelody();
			}

			p.draw = function() {
			  p.background(bg); 
			  // p.background('#303133');
			  
			  // show our guitar gun
			  guitarGun.show(p);
			  
			   // show our bullets when we shoot with space bar
			  for (var b = bullets.length - 1; b >= 0; b--) {
			    bullets[b].show(p);
			    bullets[b].move();
			    
			    // loop through our notes and see if any bullets hit one
			    for (var j = melodyOfNotes.length - 1; j >= 0; j--) {
			      if (bullets[b].hitNote(melodyOfNotes[j])) {
			        console.log("Note hit was: " + melodyOfNotes[j].name)
			        melodyOfNotes.splice(j, 1);
			        bullets[b].markForDelete();
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
			  for (var i = 0; i < melodyOfNotes.length; i++) {
			    melodyOfNotes[i].show(p);
			    melodyOfNotes[i].move();
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

			// if user taps space bar, shoot!
		 	p.keyPressed = function() {
			  if (p.key === ' ') {
			    loadBullet();
			  }  
			}

			function loadMelody() {
			  // lets shuffle our melody to have the notes come down in a random pattern
			  // we still the melody array of the original melody to compare against when user 
			  // completes/wins the game
			  shuffledMelody.shuffle();
			  
			  var xPosition = 85;

			  for (var i = 0; i < shuffledMelody.length; i++) {
			    melodyOfNotes.push(
			      new Note(shuffledMelody[i], 
			      		   noteImages[shuffledMelody[i]], 
			      		   xPosition, 10, 
			      		   .1 * p.random(1, 7),
			      		   canvasWidth,
			      		   canvasHeight,
			      		   gameOverLine));
			    xPosition += 130;
			  }
			}
			
			function loadBullet() {
			  bullets.push(new Bullet(guitarGun.x  + 2, guitarGun.y - guitarGun.height + 50, 10, bulletImg))
			}
		};
	}
})()