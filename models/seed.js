db.songs.dropIndexes()
db.songs.drop()

db.songs.insert({ name: "Twinkle Twinkle Little Star", 
  melodies: [{name: "Melody1", 
              melody:['C4','C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4','D4','C4']
             }]
})

db.songs.update({name: "Twinkle Twinkle Little Star"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:['G4','G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'G4', 'G4', 'F4', 'F4', 'E4','E4','D4']
}}})

db.songs.insert({name: "Frere Jacques", 
melodies: [{name: "Melody1", 
melody:['D4','E4', 'F#4', 'D4', 'D4', 'E4', 'F#4', 'D4', 'F#4', 'G4', 'A4', 'F#4','G4','A4']
}]})

db.songs.insert({name: "Itsy-Bitsy Spider", 
melodies: [{name: "Main Melody", 
melody:['C4', 'C4', 'C4', 'D4', 'E4', 'E4', 'E4', 'D4', 'C4', 'D4', 'E4', 'C4','E4','E4','F4','G4','G4','F4','E4','F4','G4','E4']
}]})

db.songs.insert({name: "Old McDonald Had A Farm", 
melodies: [{name: "Melody1", 
melody:['C5','C5', 'C5', 'G4', 'A4', 'A4', 'G4', 'E5', 'E5', 'D5', 'D5', 'C5']
}]})

db.songs.update({name: "Old McDonald Had A Farm"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:['G4','C5', 'C5', 'C5', 'G4', 'A4', 'A4', 'G4', 'E5', 'E5','D5','D5','C5']
}}})

db.songs.insert({name: "Happy Birthday", 
melodies: [{name: "Main Melody", 
melody:['G4','G4', 'A4', 'G4', 'C5', 'B4', 'G4', 'G4', 'A4', 'G4', 'D5', 'C5']
}]})

db.songs.update({name: "Happy Birthday"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:['G4','G4','G4','E5','C5','B4','A4','F5','F5','E5','C5','D5','C5']
}}})