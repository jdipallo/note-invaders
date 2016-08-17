db.songs.dropIndexes()
db.songs.drop()

db.songs.insert({ name: "Twinkle Twinkle Little Star", 
  				  melodies: [{
  				  		name: "Melody1", 
             	 		melody:[{note: 'C4q', beat: 1}, {note: 'C4q', beat: 1}, {note: 'G4q', beat: 1}, {note: 'G4q', beat: 1},
              		  		{note: 'A4q', beat: 1}, {note: 'A4q', beat: 1}, {note: 'G4h', beat: 2}, {note: 'F4q', beat: 1}, 
              		  		{note: 'F4q', beat: 1}, {note: 'E4q', beat: 1}, {note: 'E4q', beat: 1}, {note: 'D4q', beat: 1},
              		  		{note: 'D4q', beat: 1},{note: 'C4h', beat: 2}
              		 	   ]
            	  }]
			   })

db.songs.update({name: "Twinkle Twinkle Little Star"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:[{note: 'G4q', beat: 1},{note: 'G4q', beat: 1}, {note: 'F4q', beat: 1}, {note: 'F4q', beat: 1}, 
			{note: 'E4q', beat: 1}, {note: 'E4q', beat: 1}, {note: 'D4h', beat: 2}, {note: 'G4q', beat: 1},
			{note: 'G4q', beat: 1}, {note: 'F4q', beat: 1}, {note: 'F4q', beat: 1}, {note: 'E4q', beat: 1}, 
			{note: 'E4q', beat: 1}, {note: 'D4h', beat: 2}]
}}})

db.songs.insert({name: "Frere Jacques", 
melodies: [{name: "Melody1", 
melody:[{note: 'D4q', beat: 1},{note: 'E4q', beat: 1}, {note: 'F#4q', beat: 1}, {note: 'D4q', beat: 1}, 
		{note: 'D4q', beat: 1},{note: 'E4q', beat: 1}, {note: 'F#4q', beat: 1}, {note: 'D4q', beat: 1}, 
		{note: 'F#4q', beat: 1}, {note: 'G4q', beat: 1}, {note: 'A4h', beat: 2}, {note: 'F#4q', beat: 1}, 
		{note: 'G4q', beat: 1}, {note: 'A4h', beat: 2}]
}]})

db.songs.insert({name: "Old McDonald Had A Farm", 
melodies: [{name: "Melody1", 
melody:[{note: 'C5q', beat: 1},{note: 'C5q', beat: 1}, {note: 'C5q', beat: 1}, {note: 'G4q', beat: 1}, {note: 'A4q', beat: 1},
 {note: 'A4q', beat: 1}, {note: 'G4h', beat: 2}, {note: 'E5q', beat: 1}, {note: 'E5q', beat: 1}, {note: 'D5q', beat: 1}, 
 {note: 'D5q', beat: 1},{note: 'C5h', beat: 2},]
}]})

db.songs.insert({name: "Happy Birthday", 
melodies: [{name: "Main Melody", 
melody:[{note: 'G4de', beat: .75},{note: 'G4s', beat: .25},{note: 'A4q', beat: 1}, {note: 'G4q', beat: 1}, 
{note: 'C5q', beat: 1},{note: 'B4h', beat: 2},{note: 'G4de', beat: .75},{note: 'G4s', beat: .25},{note: 'A4q', beat: 1}, 
{note: 'G4q', beat: 1},{note: 'D5q', beat: 1},{note: 'C5h', beat: 2}]
}]})

db.songs.update({name: "Happy Birthday"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:[{note: 'G4de', beat: .75},{note: 'G4s', beat: .25},{note: 'G5q', beat: 1},{note: 'E5q', beat: 1},
	{note: 'C5q', beat: 1},{note: 'B4q', beat: 1},{note: 'A4h', beat: 2},{note: 'F5de', beat: .75},{note: 'F5s', beat: .25},
	{note: 'E5q', beat: 1},{note: 'C5q', beat: 1},{note: 'D5q', beat: 1},{note: 'C5h', beat: 2}]
}}})