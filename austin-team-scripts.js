/**
	Title: austin-team-scripts.js
    Author: William John Austin & TiaNiecia Mosley
    Date: 12 July 2023
    Description: MongoDB Shell Scripts for the Customer and Books collections for What-A-Book Project.
 */



db.teams.drop()

// Create the Customer and Books collections using Document Validation.
db.createCollection("teams", {
	validator: { $jsonSchema: {
		bsonType: "object",
		properties: {
			name: {
				bsonType: "string"
			},
			mascot: {
				bsonType: "string"
			},
			players: {
				bsonType: "array"
			},
            teamId: {
                bsonType: "string"
            }
		}
	}}
})




team1 = {
    "name":"Cardinals",
    "mascot":"Chris the Cardinal",
    "players": [
        {
            "firstName":"James",
            "lastName":"Monroe",
            "salary":100000
        },
        {
            "firstName":"John",
            "lastName":"Adams",
            "salary":100000 
        },
        {
            "firstName":"George",
            "lastName":"Washington",
            "salary":1000000 
        },
        {
            "firstName":"Thomas",
            "lastName":"Jefferson",
            "salary":100000 
        },
        {
            "firstName":"John Quincy",
            "lastName":"Adams",
            "salary":200000 
        },
        
    ],
    "teamId":"101"
}

team2 = {
    "name":"Bears",
    "mascot":"Bob the Bear",
    "players": [
        {
            "firstName":"Franklin",
            "lastName":"Pierce",
            "salary":100000
        },
        {
            "firstName":"John",
            "lastName":"Tyler",
            "salary":100000 
        },
        {
            "firstName":"Chester A",
            "lastName":"Arthur",
            "salary":1000000 
        },
        {
            "firstName":"Andrew",
            "lastName":"Jackson",
            "salary":100000 
        },
        {
            "firstName":"Abraham",
            "lastName":"Lincoln",
            "salary":200000 
        },
        
    ],
    "teamId":"102"
}

team3 = {
    "name":"Pirates",
    "mascot":"Peppy the Pirate",
    "players": [
        {
            "firstName":"James",
            "lastName":"Garfield",
            "salary":100000
        },
        {
            "firstName":"Warren G",
            "lastName":"Harding",
            "salary":100000 
        },
        {
            "firstName":"George",
            "lastName":"Bush",
            "salary":1000000 
        },
        {
            "firstName":"Ronald",
            "lastName":"Reagan",
            "salary":100000 
        },
        {
            "firstName":"William",
            "lastName":"McKinnley",
            "salary":200000 
        },
        
    ],
    "teamId":"103"
}
team4 = {
    "name":"Rams",
    "mascot":"Remy the Ram",
    "players": [
        {
            "firstName":"Woodrow",
            "lastName":"Wilson",
            "salary":100000
        },
        {
            "firstName":"Herbert",
            "lastName":"Hoover",
            "salary":100000 
        },
        {
            "firstName":"Teddy",
            "lastName":"Roosevelt",
            "salary":1000000 
        },
        {
            "firstName":"Lyndon",
            "lastName":"Johnson",
            "salary":100000 
        },
        {
            "firstName":"Jimmy",
            "lastName":"Carter",
            "salary":200000 
        },
        
    ],
    "teamId":"104"
}
team5 = {
    "name":"Seahawks",
    "mascot":"Susan the Seahawk",
    "players": [
        {
            "firstName":"Barak",
            "lastName":"Obama",
            "salary":100000
        },
        {
            "firstName":"Franklin",
            "lastName":"Roosevelt",
            "salary":100000 
        },
        {
            "firstName":"Harry",
            "lastName":"Truman",
            "salary":1000000 
        },
        {
            "firstName":"Gerald",
            "lastName":"Ford",
            "salary":100000 
        },
        {
            "firstName":"Joe",
            "lastName":"Biden",
            "salary":200000 
        },
        
    ],
    "teamId":"105"
}
//Insert the documents
db.teams.insertOne(team1)
db.teams.insertOne(team2)
db.teams.insertOne(team3)
db.teams.insertOne(team4)
db.teams.insertOne(team5)

