db.songs.dropIndexes()
db.songs.drop()

db.songs.insert({ name: "Twinkle Twinkle Little Star", 
  melodies: [{name: "Melody1", 
              melody:['C3','C3', 'G3', 'G3', 'A3', 'A3', 'G3', 'F3', 'F3', 'E3', 'E3', 'D3','D3','C3']
             }]
})

db.songs.update({name: "Twinkle Twinkle Little Star"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:['G3','G3', 'F3', 'F3', 'E3', 'E3', 'D3', 'G3', 'G3', 'F3', 'F3', 'E3','E3','D3']
}}})

db.songs.insert({name: "Frere Jacques", 
melodies: [{name: "Melody1", 
melody:['D3','E3', 'F#3', 'D3', 'D3', 'E3', 'F#3', 'D3', 'F#3', 'G3', 'A3', 'F#3','G3','A3']
}]})

db.songs.insert({name: "Itsy-Bitsy Spider", 
melodies: [{name: "Main Melody", 
melody:['C3', 'C3', 'C3', 'D3', 'E3', 'E3', 'E3', 'D3', 'C3', 'D3', 'E3', 'C3','E3','E3','F3','G3','G3','F3','E3','F3','G3','E3']
}]})

db.songs.insert({name: "Old McDonald Had A Farm", 
melodies: [{name: "Melody1", 
melody:['C4','C4', 'C4', 'G3', 'A3', 'A3', 'G3', 'E4', 'E4', 'D4', 'D4', 'C4']
}]})

db.songs.update({name: "Old McDonald Had A Farm"}, 
	{$push: {melodies: {name: "Melody2", 
	melody:['G3','G3', 'C4', 'C4', 'C4', 'G3', 'G3', 'C4', 'C4', 'C4','C4','C4','C4','C4','C4','C4','C4','C4','C4','C4','C4','C4']
}}})

db.songs.insert({name: "Happy Birthday To You", 
melodies: [{name: "Main Melody", 
melody:['G3','G3', 'A3', 'G3', 'C4', 'B3', 'G3', 'G3', 'A3', 'G3', 'D4', 'C4','G3','G3','G3','E4','C4','B3','A3','F4','F4','E4','C4','D4','C4']
}]})