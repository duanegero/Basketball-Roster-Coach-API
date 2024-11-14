const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const pool = require('../db');


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

//defining the route for root URL
router.get('/', async (req, res) => {
    //start try catch
    try{
        //sending query and storing the result in variable
        const result = await pool.query('SELECT * FROM teamThree');
        //sending result rows to client in json
        res.json(result.rows);
    } catch(error) {
        //log any errors for troubleshoot
        console.log("Error", error)
        res.status(500).json({message: "Error"})
    }
})

router.get('/:id', async (req, res) => {
    const playerId = parseInt(req.params.id); //parse the id from the URL
    try{
        const result = await pool.query('SELECT * FROM teamOne WHERE id = $1', [playerId])
        res.json(result.rows[0])
    }catch(error){
        console.log("Error", error);
        res.status(500).json({message: "Error"})
    }
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