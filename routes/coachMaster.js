const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const pool = require('../db') //importing database connection pool from db

//defining route to get all coaches
router.get('/', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM coachMaster')
        res.json(result.rows)
    }catch(error){
        console.log("Error", error)
        res.status(500).json({message: "Error"})
    }
})

//defining route to get coach by ID
router.get('/:id', async (req, res) => {
    const coachId = parseInt(req.params.id);//parse the id from the URL

    try{
        //sending query and storing the result in variable
        const result = await pool.query('SELECT * FROM coachMaster WHERE id = $1', [coachId])
        //send first row of query as json
        res.json(result.rows[0])
    }catch(error){
        //log any errors for troubleshoot
        console.log("Error", error)
        res.status(500).json({message: "Error"})
    }
})

//defining route to make new coach
router.post('/', async (req, res) => {
    //getting the info from the request body
    const {first_name, team, assistant_coach} = req.body;

    try{
        //sending query find max id's in table
        const maxId = await pool.query('SELECT COALESCE(MAX(id), 0) AS max_id FROM coachMaster;');
        //setting new id to max +1
        const newId = maxId.rows[0].max_id + 1;

        //creating a query variable to use when send queries
        const query = `
            INSERT INTO coachMaster(id, first_name, team, assistant_coach)
            VALUES($1, $2, $3, $4)
            RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query, [newId, first_name, team, assistant_coach])
        //sending the json result back
        res.status(201).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
})

//defining route to update coach
router.put('/:id', async (req, res) => {
    const coachId = parseInt(req.params.id); //parse the id from the URL
    //getting the info from the request body
    const {first_name, team, assistant_coach} = req.body;

    try{
        //creating a query variable to use when send queries
        const query = `UPDATE coachMaster
            SET first_name = $1, team = $2, assistant_coach = $3
            WHERE id = $4
            RETURNING *;`
        ;

        //sending a query with query variable and info from request body
        const result = await pool.query(query,[first_name, team, assistant_coach, coachId])
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
    const coachId = parseInt(req.params.id); //parse id from URL

    try{
        //create a vaiable for the query
        const query = `DELETE FROM coachMaster 
        WHERE id = $1;`;

        //send a query to database
        const result = await pool.query(query, [coachId])
        //return deleted id
        res.status(204).json(result.rows[0]);
    }catch(error){
        //log any errors for troubleshoot
        console.log('Error', error);
        res.status(500).json({message: "Error"})
    }
});

module.exports = router;

