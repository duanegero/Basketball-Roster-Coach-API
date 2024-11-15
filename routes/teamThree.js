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

//defining the route for to get all players 
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

//defining route to get player by ID 
router.get('/:id', async (req, res) => {
    const playerId = parseInt(req.params.id); //parse the id from the URL

    try{
        //sending query and storing the result in variable
        const result = await pool.query('SELECT * FROM teamOne WHERE id = $1', [playerId])
        //send first row of query as json
        res.json(result.rows[0])
    }catch(error){
        //log any errors for troubleshoot
        console.log("Error", error);
        res.status(500).json({message: "Error"})
    }
})

//defining route to add new player 
router.post('/', async (req, res) => {
    //getting the info from the request body
    const {first_name, age, email} = req.body;

    try{
        //sending query find max id's in table
        const maxId = await pool.query('SELECT COALESCE(MAX(id), 0) AS max_id FROM teamThree;')
        //setting new id to max +1
        const newId = maxId.rows[0].max_id + 1;

        //creating a query variable to use when send queries
        const query = 
            `INSERT INTO teamThree(id, first_name, age, email, team_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query, [newId, first_name, age, email, 'team3'])
        //sending the json result back
        res.status(201).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
})

//defining route to update player
router.put('/:id', async (req, res) => {
    const playerId = parseInt(req.params.id)//parse the id from the URL

    //getting the info from the request body
    const {first_name, age, email} = req.body;

    try{
        //creating a query variable to use when send queries
        const query = `UPDATE teamThree
        SET first_name = $1, age = $2, email = $3, team_name = $4
        WHERE id = $5
        RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query, [first_name, age, email, 'team3', playerId])
        //sending the json result back
        res.status(200).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
})

router.delete("/:id", async (req, res) => {
    const playerId = parseInt(req.params.id); //parse id from URL

    try{
        //create a vaiable for the query
        const query = `DELETE FROM teamThree 
        WHERE id = $1;`;

        //send a query to database
        const result = await pool.query(query, [playerId])
        //return deleted id
        res.status(204).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
});

module.exports = router;