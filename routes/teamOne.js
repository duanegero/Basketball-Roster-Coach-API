const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const pool = require('../db'); //importing database connection pool from db

//defining the route for root URL
router.get('/', async (req, res) =>{
    //start try catch
    try{
        //sending query and storing the result in variable
        const result = await pool.query('SELECT * FROM teamOne')
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
        const maxId = await pool.query('SELECT COALESCE(MAX(id), 0) AS max_id FROM teamOne;');
        //setting new id to max +1
        const newId = maxId.rows[0].max_id + 1;

        //creating a query variable to use when send queries
        const query = 
            `INSERT INTO teamOne(id, first_name, age, email, team_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query, [newId, first_name, age, email, 'team1'])
        //sending the json result back
        res.status(201).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
})

//defining route to update new player
router.put('/:id', async (req, res) => {
    const playerId = parseInt(req.params.id)//parse the id from the URL

    //getting the info from the request body
    const {first_name, age, email} = req.body;

    try{
        //creating a query variable to use when send queries
        const query = `UPDATE teamOne
        SET first_name = $1, age = $2, email = $3, team_name = $4
        WHERE id = $5
        RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query, [first_name, age, email, 'team1', playerId])
        //sending the json result back
        res.status(200).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
})

//defining route to delete player
router.delete("/:id", async (req, res) => {
    const playerId = parseInt(req.params.id); //parse id from URL

    try{
        //create a vaiable for the query
        const query = `DELETE FROM teamOne 
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
