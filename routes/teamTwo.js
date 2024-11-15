const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const pool = require('../db');

//array of objects, sample data
let teamTwo = [
    { id: 1, first_name: 'name1', age: 20, email: 'test1@email.com', team_name: 'team2' },
    { id: 2, first_name: 'name2', age: 21, email: 'test2@email.com', team_name: 'team2'  },
    { id: 3, first_name: 'name3', age: 20, email: 'test3@email.com', team_name: 'team2'  },
    { id: 4, first_name: 'name4', age: 22, email: 'test4@email.com', team_name: 'team2'  },
    { id: 5, first_name: 'name5', age: 20, email: 'test5@email.com', team_name: 'team2'  },
    { id: 6, first_name: 'name6', age: 21, email: 'test6@email.com', team_name: 'team2'  },
    { id: 7, first_name: 'name7', age: 20, email: 'test7@email.com', team_name: 'team2'  },
    { id: 8, first_name: 'name8', age: 22, email: 'test8@email.com', team_name: 'team2'  },
    { id: 9, first_name: 'name9', age: 21, email: 'test9@email.com', team_name: 'team2'  },
    { id: 10, first_name: 'name10', age: 20, email: 'test10@email.com', team_name: 'team2'  }
]

//defining the route for root URL
router.get('/', async (req, res) =>{
    //start try catch
    try{
        //sending query and storing the result in variable
        const result = await pool.query('SELECT * FROM teamTwo');
        //sending result rows to client in json
        res.json(result.rows);
    } catch(error) {
        //log any errors for troubleshoot
        console.log("Error", error)
        res.status(500).json({message: "Error"})
    }
})

//defining route for to get single player by id
router.get('/:id', async (req, res) => {
    const playerId = parseInt(req.params.id); //parse the id from the URL
    try{
        //sending query and storing the result in variable
        const result = await pool.query('SELECT * FROM teamTwo WHERE id = $1', [playerId])
        //send first row of query as json
        res.json(result.rows[0])
    }catch(error){
        //log any errors for troubleshoot
        console.log("Error", error);
        res.status(500).json({message: "Error"})
    }

    // const player = teamTwo.find((p) => p.id === playerId); //looking for player with id and assiging to variable
    
    // if(player) res.json(player); //if found return json
    // else res.status(404).send('Player Not Found') //else send error 
})

router.post('/', async (req, res) => {
    //getting the info from the request body
    const {first_name, age, email} = req.body;

    try{
        //sending query find max id's in table
        const maxId = await pool.query('SELECT COALESCE(MAX(id), 0) AS max_id FROM teamTwo;')
        //setting new id to max +1
        const newId = maxId.rows[0].max_id + 1;

        //creating a query variable to use when send queries
        const query = 
            `INSERT INTO teamTwo(id, first_name, age, email, team_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query, [newId, first_name, age, email, 'team2'])
        //sending the json result back
        res.status(201).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
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