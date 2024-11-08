const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route

//array of objects, sample data
let teamTwo = [
    { id: 1, first_name: 'name1', age: 20, email: 'test1@email.com', team_name: 'teamTwo' },
    { id: 2, first_name: 'name2', age: 21, email: 'test2@email.com', team_name: 'teamTwo'  },
    { id: 3, first_name: 'name3', age: 20, email: 'test3@email.com', team_name: 'teamTwo'  },
    { id: 4, first_name: 'name4', age: 22, email: 'test4@email.com', team_name: 'teamTwo'  },
    { id: 5, first_name: 'name5', age: 20, email: 'test5@email.com', team_name: 'teamTwo'  },
    { id: 6, first_name: 'name6', age: 21, email: 'test6@email.com', team_name: 'teamTwo'  },
    { id: 7, first_name: 'name7', age: 20, email: 'test7@email.com', team_name: 'teamTwo'  },
    { id: 8, first_name: 'name8', age: 22, email: 'test8@email.com', team_name: 'teamTwo'  },
    { id: 9, first_name: 'name9', age: 21, email: 'test9@email.com', team_name: 'teamTwo'  },
    { id: 10, first_name: 'name10', age: 20, email: 'test10@email.com', team_name: 'teamTwo'  }
]

//defining the route for root URL
router.get('/', (req, res) =>{
    res.json(teamTwo) //returning playes in json
})

//defining route for to get single player by id
router.get('/:id', (req, res) => {
    const playerId = parseInt(req.params.id); //parse the id from the URL
    const player = teamTwo.find((p) => p.id === playerId); //looking for player with id and assiging to variable
    
    if(player) res.json(player); //if found return json
    else res.status(404).send('Player Not Found') //else send error 
})

router.post('/', (req, res) => {
    const newPlayer = { id: teamTwo.length + 1, ...req.body }; //creating new varibale object with new player info
    teamTwo.push(newPlayer); //adding new player to team one array
    res.status(201).json(newPlayer) //sending status 
})

router.put('/:id', (req, res) => {
    const playerId = parseInt(req.params.id)
    const playerIndex = teamTwo.findIndex((p) => p.id === playerId)
    if(playerIndex !== -1){
        teamTwo[playerIndex] = {id:playerId, ...req.body}
        res.json(teamTwo[playerIndex])
    }
    else res.status(404).send('Player Not Found')
})

router.delete("/:id", (req, res) => {
    teamTwo = teamTwo.filter((p) => p.id !== parseInt(req.params.id)); 
    res.status(204).send();
});

module.exports = router;