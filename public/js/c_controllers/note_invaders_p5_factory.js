// (function() {
// 	angular.module('NoteInvadersP5Module', ['angular-p5'])
// 		.factory('noteInvadersP5', noteInvadersP5)

// 		noteInvadersP5.$inject = ['p5']

// 		function noteInvadersP5(p5) {
// 			return function(p) {

// 			var x = 700
// 			var y = 500
// 		    var shapes = [{x: 50, y: 50}]

// 		    p.setup = function() {

// 		      p.createCanvas(x + 100, y + 100)
// 		    }

// 		    p.draw = function() {
// 		      p.background(150)
// 		      for (var i = 0; i < shapes.length; i++) {
// 		        p.fill(100, 200, 200)

// 		        p.ellipse(shapes[i].x, shapes[i].y, 25, 25)
// 		      }
// 		    }

// 		    p.mouseClicked = function() {
// 		      shapes.push({x: p.mouseX, y:p.mouseY})
// 		    }

//     		console.log("In noteInvaders: songCtrl.name = ", songCtrl.getMelody())    
// 			};
// 		}
// })()