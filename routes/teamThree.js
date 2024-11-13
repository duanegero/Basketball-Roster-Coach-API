const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route

let teamThree = [
    { id: 1, first_name: 'name1', age: 30, email: 'test1@email.com', team_name: 'team3' },
    { id: 2, first_name: 'name2', age: 31, email: 'test2@email.com', team_name: 'team3' },
    { id: 3, first_name: 'name3', age: 30, email: 'test3@email.com', team_name: 'team3' },
    { id: 4, first_name: 'name4', age: 32, email: 'test4@email.com', team_name: 'team3' },
    { id: 5, first_name: 'name5', age: 30, email: 'test5@email.com', team_name: 'team3' },
    { id: 6, first_name: 'name6', age: 31, email: 'test6@email.com', team_name: 'team3' },
    { id: 7, first_name: 'name7', age: 30, email: 'test7@email.com', team_name: 'team3' },
    { id: 8, first_name: 'name8', age: 32, email: 'test8@email.com', team_name: 'team3' },
    { id: 9, first_name: 'name9', age: 31, email: 'test9@email.com', team_name: 'team3' },
    { id: 10, first_name: 'name10', age: 30, email: 'test10@email.com', team_name: 'team3' }
]

router.get('/', (req, res) => {
    res.json(teamThree)
})

router.get('/:id', (req, res) => {
    const playerId = parseInt(req.params.id); //parse the id from the URL
    const player = teamThree.find((p) => p.id === playerId); //looking for player with id and assiging to variable
    
    if(player) res.json(player); //if found return json
    else res.status(404).send('Player Not Found') //else send error 
})

router.post('/', (req, res) => {
    const newPlayer = { id: teamThree.length + 1, ...req.body }; //creating new varibale object with new player info
    teamThree.push(newPlayer); //adding new player to team one array
    res.status(201).json(newPlayer) //sending status 
})

router.put('/:id', (req, res) => {
    const playerId = parseInt(req.params.id)
    const playerIndex = teamThree.findIndex((p) => p.id === playerId)
    if(playerIndex !== -1){
        teamThree[playerIndex] = {id:playerId, ...req.body}
        res.json(teamThree[playerIndex])
    }
    else res.status(404).send('Player Not Found')
})

router.delete("/:id", (req, res) => {
    teamThree = teamThree.filter((p) => p.id !== parseInt(req.params.id)); 
    res.status(204).send();
});

module.exports = router;