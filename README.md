# Note Invaders

### Learning To Read Music One Galaxy At A Time...
The objective of Note Invaders is for the budding musician just starting out to learn to sight read and develop their musical ear by hearing notes and melodies in a fun interactive way.

Like the classic game, Space Invaders, users shoot down the appropriate note from their chosen song and melody. Each correct note garnishes 100 points. Incorrect notes will cost you 100 points.

You may see a random monkey with a guitar on a spaceship. Shoot him down and you'll gain 500 points.

Upon completion of the game, users have the opportunity not only to see the melody on a staff, they can play it back for further study.

### Limitations
Currently, Note Invaders is support by Chrome. It is not supported by Safari and untested with Firefox, Opera, etc..

Version 1 of Note Invaders supports the note range: C4-C6. This range gives us many many songs for the user to start learning.

Version 2 of Note Invaders will support MIDI. On on screen piano graphic will accompany.

## Demo
To demo Note Invaders, please visit:
```
www.noteinvaders.com
```

- Select a song and melody and fire away!

## Installing - Prereqs = Node & Bower

``` 
git clone https://github.com/jdipallo/note-invaders.git
```

```
npm install
```

```
bower install
```

## If you don't have mongo installed: install with Homebrew (or manually if you need. Google that)
```
brew install mongodb
``` 

## Seed the database with some songs and melodies

``` 
cd note-invaders
```

```
mongo noteinvaders < models/seed.js
```

## Running the server with nodemon (will look in the package.json file for 'server.js') or use node.js)
(on port 3030 or PORT env variable)

```
nodemon (or node server.js)
```

## Have fun! In your Chrome Browser
```
localhost:3030
```

## Built With

* MEAN Stack - HTML5/CSS, Bootstrap, AngularJS, NodeJS/ExpressJS, Mongoose/MongoDB
* P5.js - Processing library for graphics/animations/sounds

## Authors
** Jeff DiPallo

## License
